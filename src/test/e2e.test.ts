import snapshot from "snap-shot-it";
import pager from "../";
import { gap_item } from "../test/data.test";

describe("e2e", function () {
  [
    () => pager(10, 0),
    () => pager(10, 2),
    () => pager(10, 5),
    () => pager(10, 9),
    () => pager(100, 0, { target: 10 }),
    () => pager(100, 0, { target: 10, neighbours: { edge: 3, current: 1 } }),
    () => pager(100, 0, { target: 10, neighbours: { edge: 1, current: 3 } }),
    () => pager(100, 30, { target: 10 }),
    () => pager(100, 30, { target: 10, neighbours: { edge: 3, current: 1 } }),
    () => pager(100, 30, { target: 10, neighbours: { edge: 1, current: 3 } }),
    () => pager(100, 50, { target: 10 }),
    () => pager(100, 50, { target: 10, neighbours: { edge: 3, current: 1 } }),
    () => pager(100, 50, { target: 10, neighbours: { edge: 1, current: 3 } }),
    () => pager(100, 13, { target: 15 }),
    () => pager(100, 0, { target: 10, focus: gap_item(3, 49) }),
    () => pager(100, 33, { target: 10, focus: gap_item(48, 49) }),
    () => pager(100, 33, { target: 10, focus: gap_item(46, 49) }),
    () => pager(100, 0, { target: 10, focus: gap_item(4, 14) }),
    () => pager(100, 55, { target: 10, focus: gap_item(4, 14) }),
    () => pager(100, 0, { target: 15, focus: gap_item(3, 49) }),
    () => pager(100, 33, { target: 15, focus: gap_item(48, 49) }),
    () => pager(100, 33, { target: 15, focus: gap_item(46, 49) }),
    () => pager(100, 0, { target: 15, focus: gap_item(4, 14) }),
    () => pager(100, 55, { target: 15, focus: gap_item(4, 14) }),
    () => pager(100, 0, { target: 20, focus: gap_item(3, 49) }),
    () => pager(100, 33, { target: 20, focus: gap_item(48, 49) }),
    () => pager(100, 33, { target: 20, focus: gap_item(46, 49) }),
    () => pager(100, 0, { target: 20, focus: gap_item(4, 14) }),
    () => pager(100, 55, { target: 20, focus: gap_item(4, 14) }),
  ].forEach((test) => {
    let name = test.toString();
    name = name.substring(name.indexOf("{") + 20, name.lastIndexOf("}") - 2);
    name = name.replace('data_test_1.', '');
    it(`should match snapshot '${name}'`, function () {
      snapshot(test().toString());
    });
  });
});
