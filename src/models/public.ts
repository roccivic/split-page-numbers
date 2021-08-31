export interface Neighbours {
  edge?: number;
  current?: number;
}

export interface Options {
  target?: number;
  neighbours?: Neighbours;
  focus?: Item;
}

export interface Item {
  key: string;
  isCurrent: boolean;
  isGap(): boolean;
  isNumber(): boolean;
  asGap(): GapItem;
  asNumber(): NumberItem;
  toString(): string;
}

export class GapItem implements Item {
  from: number;
  to: number;
  key: string;
  isCurrent: boolean;
  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
    this.key = `${this.from + 1}-${this.to + 1}`;
    this.isCurrent = false;
  }
  asGap(): GapItem {
    return this;
  }
  asNumber(): NumberItem {
    throw new Error("Method not implemented.");
  }
  isGap(): boolean {
    return true;
  }
  isNumber(): boolean {
    return false;
  }
  toString() : string {
    return `…${this.key}…`
  }
}

export class NumberItem implements Item {
  value: number;
  key: string;
  isCurrent: boolean;
  constructor(value: number, current: boolean) {
    this.value = value;
    this.key = (this.value + 1).toString();
    this.isCurrent = current;
  }
  asGap(): GapItem {
    throw new Error("Method not implemented.");
  }
  asNumber(): NumberItem {
    return this;
  }
  isGap(): boolean {
    return false;
  }
  isNumber(): boolean {
    return true;
  }
  toString() : string {
    if (this.isCurrent) {
      return `[${this.key}]`
    } else {
      return this.key
    }
  }
}
