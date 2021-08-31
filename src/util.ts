import { Range } from "./models/private";

export const standardNumberRange = (from: number, to: number): number[] => {
  const arr: number[] = [];
  for (let i = from; i < to; i++) {
    arr.push(i);
  }
  return arr;
};

export const innerNumberRange = (
  from: number,
  to: number,
  step: number = 1
): number[] => {
  if (step <= 0) {
    throw Error(`Invalid step '${step}' for range`);
  }
  const arr: number[] = [];
  for (let i = from + step; i < to; i += step) {
    arr.push(i);
  }
  return arr;
};

export const outerNumberRange = (
  from: number,
  to: number,
  step: number = 1
): number[] => {
  if (step <= 0) {
    throw Error(`Invalid step '${step}' for range`);
  }
  const arr: number[] = [];
  for (let i = from; i <= to; i += step) {
    arr.push(i);
  }
  return arr;
};

export const uniq = (arr: number[]): number[] => {
  return arr.reduce((accumulator, value) => {
    if (accumulator.indexOf(value) === -1) {
      accumulator.push(value);
    }
    return accumulator;
  }, new Array<number>());
};

export const flatten = (arr: Range[][]): Range[] => {
  return arr.reduce((accumulator, value) => {
    return accumulator.concat(value);
  }, []);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
