import { expect } from "chai";
import { GapItem, Item, NumberItem } from "./public";

describe("public models", function () {
  describe("GapItem", function () {
    it("should return true for isGap()", function () {
      expect(new GapItem(1,3).isGap()).to.be.true
    });
    it("should return false for isNumber()", function () {
      expect(new GapItem(1,3).isNumber()).to.be.false
    });
    it("should cast from Item", function () {
      const item : Item = new GapItem(1,3);
      expect(item.asGap()).to.eql(new GapItem(1,3))
    });
    it("should not cast to NumberItem", function () {
      const item : Item = new GapItem(1,3);
      expect(() => item.asNumber()).to.throw("not implemented")
    });
  });
  describe("NumberItem", function () {
    it("should return true for isNumber()", function () {
      expect(new NumberItem(1, false).isNumber()).to.be.true
    });
    it("should return false for isGap()", function () {
      expect(new NumberItem(1, false).isGap()).to.be.false
    });
    it("should cast from Item", function () {
      const item : Item = new NumberItem(1, false);
      expect(item.asNumber()).to.eql(new NumberItem(1, false))
    });
    it("should not cast to NumberItem", function () {
      const item : Item = new NumberItem(1, false);
      expect(() => item.asGap()).to.throw("not implemented")
    });
  });
});
