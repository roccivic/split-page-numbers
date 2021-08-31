import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
chai.use(sinonChai);

import { Range } from "./models/private";
import {
  calculateSlices,
  derange,
  fillGaps,
  init,
  sizeSum,
  splitGaps,
  splitRange,
} from "./methods";
import {
  focus,
  gap_item,
  range,
  neighbours,
  six_contiguos_numbers,
  ten_numbers_with_small_gaps,
  three_contiguos_ranges,
  three_ranges_with_large_uneven_filled_gaps,
  three_ranges_with_single_filled_gaps,
  three_ranges_with_single_gaps,
  three_ranges_with_small_filled_gaps,
  three_ranges_with_small_gaps,
} from "./test/data.test";

describe("methods", function () {
  describe("fillGaps", function () {
    it("should throw on empty array", function () {
      expect(() => fillGaps([])).to.throw();
    });
    it("should return same array", function () {
      expect(fillGaps(three_contiguos_ranges())).to.eql(
        three_contiguos_ranges()
      );
    });
    it("should fill single gaps", function () {
      expect(fillGaps(three_ranges_with_single_gaps())).to.eql(
        three_ranges_with_single_filled_gaps()
      );
    });
    it("should fill small gaps", function () {
      expect(fillGaps(three_ranges_with_small_gaps())).to.eql(
        three_ranges_with_small_filled_gaps()
      );
    });
  });
  describe("sizeSum", function () {
    it("should sum up ranges", function () {
      expect(sizeSum([], "")).to.equal(0);
      expect(sizeSum(three_contiguos_ranges(), "range")).to.equal(6);
      expect(sizeSum(three_contiguos_ranges(), "dummy")).to.equal(0);
      expect(sizeSum(three_ranges_with_small_filled_gaps(), "range")).to.equal(
        6
      );
      expect(sizeSum(three_ranges_with_small_filled_gaps(), "gap")).to.equal(4);
      expect(sizeSum(three_ranges_with_small_filled_gaps(), "dummy")).to.equal(
        0
      );
      expect(sizeSum(three_ranges_with_single_filled_gaps(), "range")).to.equal(
        8
      );
      expect(sizeSum(three_ranges_with_single_filled_gaps(), "gap")).to.equal(
        0
      );
      expect(sizeSum(three_ranges_with_single_filled_gaps(), "dummy")).to.equal(
        0
      );
    });
  });
  describe("calculateSlices", function () {
    it("should return same array", function () {
      expect(calculateSlices([], "dummy", 10)).to.eql([]);
    });
    it("should assign zeros to slices", function () {
      const slices = (ranges: Range[], target: number) =>
        calculateSlices(ranges, "gap", target).map((range) => range.slices);
      expect(slices(three_contiguos_ranges(), 10)).to.eql([0, 0, 0]);
      expect(slices(three_ranges_with_small_filled_gaps(), 10)).to.eql([
        0, 1, 0, 1, 0,
      ]);
      expect(slices(three_ranges_with_small_filled_gaps(), 20)).to.eql([
        0, 4, 0, 4, 0,
      ]);
      expect(slices(three_ranges_with_small_filled_gaps(), 40)).to.eql([
        0, 9, 0, 9, 0,
      ]);
      expect(slices(three_ranges_with_large_uneven_filled_gaps(), 10)).to.eql([
        0, 0, 0, 1, 0,
      ]);
      expect(slices(three_ranges_with_large_uneven_filled_gaps(), 15)).to.eql([
        0, 1, 0, 2, 0,
      ]);
      expect(slices(three_ranges_with_large_uneven_filled_gaps(), 20)).to.eql([
        0, 3, 0, 3, 0,
      ]);
      expect(slices(three_ranges_with_large_uneven_filled_gaps(), 30)).to.eql([
        0, 5, 0, 6, 0,
      ]);
      expect(slices(three_ranges_with_large_uneven_filled_gaps(), 40)).to.eql([
        0, 7, 0, 9, 0,
      ]);
    });
  });
  describe("splitRange", function () {
    it("should not split wrong type", function () {
      const dummy = range(0, 10);
      expect(splitRange(dummy, 2, "dummy", false)).to.eql([dummy]);
    });
    it("should not split with one slice", function () {
      const dummy = range(0, 10);
      expect(splitRange(dummy, 1, "range", false)).to.eql([dummy]);
    });
    it("should completely fill small range", function () {
      expect(splitRange(range(0, 5), 6, "range", false)).to.eql([
        range(0, 0),
        range(1, 1),
        range(2, 2),
        range(3, 3),
        range(4, 4),
        range(5, 5),
      ]);
      expect(splitRange(range(5, 7), 30, "range", false)).to.eql([
        range(5, 5),
        range(6, 6),
        range(7, 7),
      ]);
    });
    const tests = [
      {
        actual: splitRange(range(0, 5), 5, "range", false),
        expected: [range(1, 1), range(2, 2), range(3, 3), range(4, 4)],
      },
      {
        actual: splitRange(range(0, 5), 4, "range", false),
        expected: [range(1, 1), range(3, 3), range(4, 4)],
      },
      {
        actual: splitRange(range(0, 5), 3, "range", false),
        expected: [range(2, 2), range(3, 3)],
      },
      {
        actual: splitRange(range(0, 5), 2, "range", false),
        expected: [range(3, 3)],
      },
      {
        actual: splitRange(range(0, 50), 5, "range", false),
        expected: [range(10, 10), range(20, 20), range(30, 30), range(40, 40)],
      },
      {
        actual: splitRange(range(0, 50), 4, "range", false),
        expected: [range(13, 13), range(25, 25), range(38, 38)],
      },
      {
        actual: splitRange(range(0, 50), 3, "range", false),
        expected: [range(17, 17), range(33, 33)],
      },
      {
        actual: splitRange(range(0, 50), 2, "range", false),
        expected: [range(25, 25)],
      },
      {
        actual: splitRange(range(45, 97), 3, "range", false),
        expected: [range(62, 62), range(80, 80), range(97, 97)],
      },
    ];
    tests.forEach((test, index) => {
      it(`should split range ${index}`, function () {
        expect(test.actual).to.eql(test.expected);
      });
    });
  });
  describe("splitGaps", function () {
    it("should return empty array", function () {
      expect(splitGaps([], "gap", false)).to.eql([]);
    });
    it("should split gaps", function () {
      const ranges = three_contiguos_ranges();
      expect(splitGaps(ranges, "gap", false)).to.eql(ranges);
    });
    it("should split gaps", function () {
      const ranges = three_contiguos_ranges();
      expect(splitGaps(ranges, "gap", false)).to.eql(ranges);
    });
  });
  describe("derange", function () {
    it("should return empty array", function () {
      expect(derange([], 0)).to.eql([]);
    });
    it("should derange contigous array", function () {
      expect(derange(three_contiguos_ranges(), 3)).to.eql(
        six_contiguos_numbers()
      );
    });
    it("should derange array with gaps", function () {
      expect(derange(three_ranges_with_small_filled_gaps(), 5)).to.eql(
        ten_numbers_with_small_gaps()
      );
    });
  });
  describe("init", function () {
    it("should init with smallest values", function () {
      expect(init(0, 4, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 3),
      ]);
      expect(init(1, 4, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 3),
      ]);
      expect(init(2, 4, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 3),
      ]);
      expect(init(3, 4, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 3),
      ]);
    });
    it("should init with 1 neighbour", function () {
      expect(init(0, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(8, 9),
      ]);
      expect(init(1, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 2),
        range(8, 9),
      ]);
      expect(init(2, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 3),
        range(8, 9),
      ]);
      expect(init(3, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(2, 4),
        range(8, 9),
      ]);
      expect(init(4, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(3, 5),
        range(8, 9),
      ]);
      expect(init(5, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(4, 6),
        range(8, 9),
      ]);
      expect(init(6, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(5, 7),
        range(8, 9),
      ]);
      expect(init(7, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(6, 7),
        range(8, 9),
      ]);
      expect(init(8, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(7, 7),
        range(8, 9),
      ]);
      expect(init(9, 10, neighbours(1, 1), undefined)).to.eql([
        range(0, 1),
        range(8, 9),
      ]);
    });
    it("should init with 2 neighbours", function () {
      expect(init(0, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(10, 12),
      ]);
      expect(init(1, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(3, 3),
        range(10, 12),
      ]);
      expect(init(2, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(3, 4),
        range(10, 12),
      ]);
      expect(init(3, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(3, 5),
        range(10, 12),
      ]);
      expect(init(4, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(3, 6),
        range(10, 12),
      ]);
      expect(init(5, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(3, 7),
        range(10, 12),
      ]);
      expect(init(6, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(4, 8),
        range(10, 12),
      ]);
      expect(init(7, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(5, 9),
        range(10, 12),
      ]);
      expect(init(8, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(6, 9),
        range(10, 12),
      ]);
      expect(init(9, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(7, 9),
        range(10, 12),
      ]);
      expect(init(10, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(8, 9),
        range(10, 12),
      ]);
      expect(init(11, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(9, 9),
        range(10, 12),
      ]);
      expect(init(12, 13, neighbours(2, 2), undefined)).to.eql([
        range(0, 2),
        range(10, 12),
      ]);
    });
    it("should init with focus", function () {
      expect(init(0, 10, neighbours(1, 1), gap_item(3, 5))).to.eql([
        range(0, 1),
        focus(3, 5),
        range(8, 9),
      ]);
      expect(init(20, 100, neighbours(3, 3), gap_item(30, 50))).to.eql([
        range(0, 3),
        range(17, 23),
        focus(30, 50),
        range(96, 99),
      ]);
    });
  });
});
