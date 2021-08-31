import { expect } from "chai";
import { InternalOptions } from "./private";
import { gap_item, neighbours } from "../test/data.test";

describe("private models", function () {
  describe("InternalOptions", function () {
    it("should have defaults", function () {
      expect(new InternalOptions({})).to.eql({
        target: 15,
        neighbours: neighbours(1, 2),
      });
    });
    it("should have defaults with focus", function () {
      expect(new InternalOptions({ focus: gap_item(1, 2) })).to.eql({
        target: 15,
        neighbours: neighbours(1, 2),
        focus: gap_item(1, 2),
      });
    });
    it("should over-ride target", function () {
      expect(new InternalOptions({})).to.eql({
        target: 15,
        neighbours: neighbours(1, 2),
      });
    });
    it("should fix target", function () {
      expect(new InternalOptions({ target: 1 })).to.eql({
        target: 9,
        neighbours: neighbours(1, 2),
      });
    });
    it("should set neighbours", function () {
      expect(
        new InternalOptions({
          neighbours: neighbours(2, 3),
        })
      ).to.eql({
        target: 15,
        neighbours: neighbours(2, 3),
      });
    });
    it("should set neighbours with focus", function () {
      expect(
        new InternalOptions({
          neighbours: neighbours(2, 3),
          focus: gap_item(1, 2),
        })
      ).to.eql({
        target: 15,
        neighbours: neighbours(2, 3),
        focus: gap_item(1, 2),
      });
    });
    it("should fix neighbours", function () {
      expect(
        new InternalOptions({
          neighbours: neighbours(-1, -1),
        })
      ).to.eql({
        target: 15,
        neighbours: neighbours(1, 2),
      });
    });
  });
});
