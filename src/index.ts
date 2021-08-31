import {
  calculateSlices,
  derange,
  fillGaps,
  init,
  splitGaps,
} from "./methods";
import { standardNumberRange } from "./util";
import { Item, GapItem, NumberItem, Options, Neighbours } from "./models/public";
import { InternalOptions } from "./models/private";

export type { Item, GapItem, NumberItem, Options, Neighbours };

const pager = (
  total: number,
  current: number,
  options: Options = {},
): Array<Item> => {
  if (total <= 0) {
    return [];
  }
  const opts = new InternalOptions(options);
  if (total <= opts.target) {
    return standardNumberRange(0, total).map((n) => new NumberItem(n, n === current));
  } else {
    const arr = init(current, total, opts.neighbours, opts.focus);
    let filled;
    if (opts.focus && (opts.focus.from > current || opts.focus.to < current)) {
      const withFocusSlices = calculateSlices(arr, "focus", opts.target);
      const focused = splitGaps(withFocusSlices, "focus", true);
      filled = fillGaps(focused);
    } else {
      filled = fillGaps(arr);
    }
    const withSlices = calculateSlices(filled, "gap", opts.target);
    const degapped = splitGaps(withSlices, "gap", false);
    const refilled = fillGaps(degapped);
    const rendered = derange(refilled, current);
    return rendered;
  }
};

export default pager;
