import { expect } from "chai";
import { clamp, flatten, innerNumberRange, outerNumberRange, standardNumberRange, uniq } from "./util";
import { three_contiguos_ranges } from "./test/data.test";

describe("util", function () {
  describe("standardNumberRange", function () {
    it("should make empty ranges", function () {
      expect(standardNumberRange(0, 0)).to.eql([]);
      expect(standardNumberRange(3, 3)).to.eql([]);
      expect(standardNumberRange(5, 1)).to.eql([]);
      expect(standardNumberRange(0, -1)).to.eql([]);
    });
    it("should make single item ranges", function () {
      expect(standardNumberRange(0, 1)).to.eql([0]);
      expect(standardNumberRange(0.5, 1.5)).to.eql([0.5]);
    });
    it("should make two item ranges", function () {
      expect(standardNumberRange(0, 1.5)).to.eql([0, 1]);
      expect(standardNumberRange(0, 2)).to.eql([0, 1]);
      expect(standardNumberRange(4.5, 6.5)).to.eql([4.5, 5.5]);
    });
    it("should make large item ranges", function () {
      expect(standardNumberRange(0, 10)).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe("innerNumberRange", function () {
    it("should throw", function () {
      expect(() => innerNumberRange(1,2,0)).to.throw();
      expect(() => innerNumberRange(1,2,-1)).to.throw();
    });
    it("should make empty ranges", function () {
      expect(innerNumberRange(0, 0)).to.eql([]);
      expect(innerNumberRange(3, 3)).to.eql([]);
      expect(innerNumberRange(5, 1)).to.eql([]);
      expect(innerNumberRange(0, -1)).to.eql([]);
    });
    it("should make single item ranges", function () {
      expect(innerNumberRange(0, 2)).to.eql([1]);
      expect(innerNumberRange(0.5, 1.5, 0.6)).to.eql([1.1]);
    });
    it("should make two item ranges", function () {
      expect(innerNumberRange(0.5, 3.5)).to.eql([1.5, 2.5]);
      expect(innerNumberRange(0, 3, 1.1)).to.eql([1.1, 2.2]);
      expect(innerNumberRange(4.5, 7)).to.eql([5.5, 6.5]);
    });
    it("should make large item ranges", function () {
      expect(innerNumberRange(0, 10)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe("outerNumberRange", function () {
    it("should throw", function () {
      expect(() => outerNumberRange(1,2,0)).to.throw();
      expect(() => outerNumberRange(1,2,-1)).to.throw();
    });
    it("should make empty ranges", function () {
      expect(outerNumberRange(5, 1)).to.eql([]);
      expect(outerNumberRange(0, -1)).to.eql([]);
    });
    it("should make single item ranges", function () {
      expect(outerNumberRange(0, 0)).to.eql([0]);
      expect(outerNumberRange(3, 3)).to.eql([3]);
    });
    it("should make two item ranges", function () {
      expect(outerNumberRange(0, 2)).to.eql([0, 1, 2]);
      expect(outerNumberRange(0.5, 1.5, 0.6)).to.eql([0.5, 1.1]);
    });
    it("should make three item ranges", function () {
      expect(outerNumberRange(0.5, 3.5)).to.eql([0.5, 1.5, 2.5, 3.5]);
      expect(outerNumberRange(0, 3, 1.1)).to.eql([0, 1.1, 2.2]);
      expect(outerNumberRange(4.5, 7)).to.eql([4.5, 5.5, 6.5]);
    });
    it("should make large item ranges", function () {
      expect(outerNumberRange(0, 10)).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe("uniq", function () {
    it("should return empty array", function () {
      expect(uniq([])).to.eql([]);
    });
    it("should return same array", function () {
      expect(uniq([3, 2, 1])).to.eql([3, 2, 1]);
    });
    it("should return unique array", function () {
      expect(uniq([3, 3, 2, 3, 1, 3])).to.eql([3, 2, 1]);
    });
  });

  describe("flatten", function () {
    it("should return empty array", function () {
      expect(flatten([])).to.eql([]);
      expect(flatten([[], [], []])).to.eql([]);
    });
    it("should return flat array", function () {
      const [a, b, c] = three_contiguos_ranges();
      expect(flatten([[a], [b], [c]])).to.eql([a, b, c]);
      expect(flatten([[a, b], [], [b, c]])).to.eql([a, b, b, c]);
      expect(flatten([[], [a, b], [c]])).to.eql([a, b, c]);
    });
  });

  describe("clamp", function () {
    it("should not clamp", function () {
      expect(clamp(2, 0, 4)).to.equal(2)
    });
    it("should clamp to lower bound", function () {
      expect(clamp(2, 3, 4)).to.equal(3)
    });
    it("should clamp to lower bound", function () {
      expect(clamp(5, 3, 4)).to.equal(4)
    });
  });
});
