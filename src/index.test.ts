import chai, { expect } from "chai";
import { ImportMock } from "ts-mock-imports";
import * as methods from "./methods";
import pager from "./index";
import { gap_item, neighbours, number_item, range } from "./test/data.test";
import sinonChai from "sinon-chai";
import { InternalNeighbours } from "./models/private";
chai.use(sinonChai);

const make_stubs = () => {
  const rangeArr = [range(0, 1)];
  const numberArr = [number_item(1)];
  const stub = (name: any, value: any) =>
    ImportMock.mockFunction(methods, name).returns(value);
  return {
    rangeArr,
    numberArr,
    init: stub("init", rangeArr),
    fillGaps: stub("fillGaps", rangeArr),
    splitGaps: stub("splitGaps", rangeArr),
    calculateSlices: stub("calculateSlices", rangeArr),
    derange: stub("derange", numberArr),
  };
};

describe("pager", function () {
  this.afterEach(function () {
    ImportMock.restore();
  });
  it("should return empty array", function () {
    expect(pager(0, 0)).to.eql([]);
  });
  it("should return NumberItem[]", function () {
    expect(pager(2, 0)).to.eql([number_item(0, true), number_item(1)]);
    expect(pager(2, 1)).to.eql([number_item(0), number_item(1, true)]);
  });
  it("should call methods without focus", function () {
    const stubs = make_stubs();
    expect(pager(100, 0)).to.eql(stubs.numberArr);
    expect(stubs.init).to.have.been.calledOnceWithExactly(0, 100, neighbours(1,2), undefined);
    expect(stubs.fillGaps).to.have.been.calledTwice;
    expect(stubs.fillGaps).to.have.always.been.calledWithExactly(
      stubs.rangeArr
    );
    expect(stubs.calculateSlices).to.have.been.calledOnceWithExactly(
      stubs.rangeArr,
      "gap",
      15
    );
    expect(stubs.splitGaps).to.have.been.calledOnceWithExactly(
      stubs.rangeArr,
      "gap",
      false
    );
    expect(stubs.derange).to.have.been.calledOnceWithExactly(stubs.rangeArr, 0);
  });
  it("should call methods with focus", function () {
    const stubs = make_stubs();
    expect(pager(100, 40, { focus: gap_item(20, 30) })).to.eql(stubs.numberArr);
    expect(stubs.init).to.have.been.calledOnceWithExactly(
      40,
      100,
      neighbours(1, 2),
      gap_item(20, 30)
    );
    expect(stubs.fillGaps).to.have.been.calledTwice;
    expect(stubs.fillGaps).to.have.always.been.calledWithExactly(
      stubs.rangeArr
    );
    expect(stubs.calculateSlices).to.have.been.calledTwice;
    expect(stubs.calculateSlices).to.have.been.calledWithExactly(
      stubs.rangeArr,
      "focus",
      15
    );
    expect(stubs.calculateSlices).to.have.been.calledWithExactly(
      stubs.rangeArr,
      "gap",
      15
    );
    expect(stubs.splitGaps).to.have.been.calledTwice;
    expect(stubs.splitGaps).to.have.been.calledWithExactly(
      stubs.rangeArr,
      'focus',
      true,
    );
    expect(stubs.splitGaps).to.have.been.calledWithExactly(
      stubs.rangeArr,
      'gap',
      false,
    );
    expect(stubs.derange).to.have.been.calledOnceWithExactly(
      stubs.rangeArr,
      40
    );
  });
});
