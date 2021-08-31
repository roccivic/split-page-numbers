import { GapItem, Neighbours, Options } from "./public";

export class InternalNeighbours implements Neighbours {
  edge: number = 1;
  current: number = 2;
  constructor(neighbours?: Neighbours) {
    if (neighbours) {
      if (neighbours.edge && neighbours.edge > 0) {
        this.edge = neighbours.edge;
      }
      if (neighbours.current && neighbours.current > 0) {
        this.current = neighbours.current;
      }
    }
  }
  minTarget() {
    return this.edge * 2 + this.current * 2 + 3;
  }
}

export class InternalOptions implements Options {
  target: number = 15;
  neighbours: InternalNeighbours;
  focus?: GapItem;
  constructor(options: Options) {
    this.neighbours = new InternalNeighbours(options.neighbours)
    if (options.target) {
      this.target = Math.max(options.target, this.neighbours.minTarget());
    }
    if (options.focus && options.focus.isGap()) {
      this.focus = options.focus.asGap();
    }
  }
}

export class Range {
  type: "range" | "gap" | "focus";
  from: number;
  to: number;
  slices: number;
  size: number;
  constructor(type: "range" | "gap" | "focus", from: number, to: number) {
    this.type = type;
    this.from = from;
    this.to = to;
    this.slices = 0;
    this.size = this.to - this.from + 1;
  }
}
