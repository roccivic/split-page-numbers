import { InternalNeighbours, Range } from "./models/private";
import { GapItem, NumberItem } from "./models/public";
import { clamp, innerNumberRange, outerNumberRange, flatten, uniq, standardNumberRange } from "./util";

export const fillGaps = (arr: Array<Range>) => {
  const gaps: Array<Range> = [];
  arr.reduce((prev, next) => {
    const size = next.from - prev.to;
    if (size > 1) {
      gaps.push(
        new Range(size === 2 ? "range" : "gap", prev.to + 1, next.from - 1)
      );
    }
    return next;
  });
  return arr.concat(gaps).sort((a, b) => a.from - b.from);
};

export const sizeSum = (arr: Array<Range>, type: string) =>
  arr.filter((i) => i.type === type).reduce((a, b) => a + b.size, 0);

export const calculateSlices = (
  arr: Array<Range>,
  type: string,
  target: number
) => {
  const rangeSum = sizeSum(arr, "range");
  const sum = sizeSum(arr, type);
  const available = target - rangeSum;
  return arr.map((item) => {
    if (item.type === type) {
      const ratio = item.size / sum;
      item.slices = Math.floor((ratio * available + 1) / 2);
    }
    return item;
  });
};

export const splitRange = (
  item: Range,
  slices: number,
  type: string,
  inclusive: boolean,
): Array<Range> => {
  if (item.type !== type || slices < 2) {
    return [item];
  }
  if (item.size <= slices) {
    return outerNumberRange(item.from, item.to).map(
      (n) => new Range("range", n, n)
    );
  } else {
    const step = (item.size - 1) / slices;
    const fn = inclusive ? outerNumberRange : innerNumberRange;
    return uniq(
      fn(item.from, item.to, step).map(Math.round)
    ).map((n) => new Range("range", n, n));
  }
};

export const splitGaps = (arr: Array<Range>, type: string, inclusive: boolean): Array<Range> => {
  const mapped = arr.map((item) => splitRange(item, item.slices, type, inclusive));
  return flatten(mapped);
};

export const derange = (
  arr: Array<Range>,
  current: number
): Array<GapItem | NumberItem> => {
  const deranged: Array<GapItem | NumberItem> = [];
  for (let item of arr) {
    if (item.type === "gap") {
      deranged.push(new GapItem(item.from, item.to));
    } else {
      outerNumberRange(item.from, item.to)
        .map((num) => new NumberItem(num, num === current))
        .forEach((i) => deranged.push(i));
    }
  }
  return deranged;
};

export const init = (
  current: number,
  total: number,
  neighbours: InternalNeighbours,
  focus: GapItem | undefined
): Array<Range> => {
  const last = total - 1;
  current = clamp(current, 0, last);
  let arr = [
    new Range("range", 0, neighbours.edge),
    new Range(
      "range",
      Math.max(neighbours.edge + 1, current - neighbours.current),
      Math.min(last - neighbours.edge - 1, current + neighbours.current)
    ),
    new Range("range", last - neighbours.edge, last),
  ].filter((item) => item.to >= item.from);
  if (focus) {
    arr.push(new Range("focus", focus.from, focus.to));
    arr = arr.sort((a, b) => a.from - b.from);
  }
  return arr;
};
