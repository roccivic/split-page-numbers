import { InternalNeighbours, Range } from "../models/private";
import { GapItem, NumberItem } from "../models/public";

export const range = (from: number, to: number) => new Range("range", from, to);
export const gap = (from: number, to: number) => new Range("gap", from, to);
export const focus = (from: number, to: number) => new Range("focus", from, to);
export const number_item = (value: number, current: boolean = false) =>
  new NumberItem(value, current);
export const gap_item = (from: number, to: number) => new GapItem(from, to);
export const neighbours = (edge?: number, current?: number) =>
  new InternalNeighbours({ edge, current });

export const three_contiguos_ranges = () => [
  range(1, 2),
  range(3, 4),
  range(5, 6),
];
export const six_contiguos_numbers = () => [
  number_item(1),
  number_item(2),
  number_item(3, true),
  number_item(4),
  number_item(5),
  number_item(6),
];
export const three_ranges_with_small_gaps = () => [
  range(1, 2),
  range(5, 6),
  range(9, 10),
];
export const three_ranges_with_small_filled_gaps = () => [
  range(1, 2),
  gap(3, 4),
  range(5, 6),
  gap(7, 8),
  range(9, 10),
];
export const ten_numbers_with_small_gaps = () => [
  number_item(1),
  number_item(2),
  gap_item(3, 4),
  number_item(5, true),
  number_item(6),
  gap_item(7, 8),
  number_item(9),
  number_item(10),
];
export const three_ranges_with_single_gaps = () => [
  range(1, 2),
  range(4, 5),
  range(7, 8),
];
export const three_ranges_with_single_filled_gaps = () => [
  range(1, 2),
  range(3, 3),
  range(4, 5),
  range(6, 6),
  range(7, 8),
];

export const three_ranges_with_large_uneven_filled_gaps = () => [
  range(1, 2),
  gap(3, 40),
  range(41, 44),
  gap(45, 97),
  range(98, 99),
];
