import {
  FILTER_BY_SPORT,
  FILTER_BY_NAME,
  FILTER_BY_DATE,
  FILTER_BY_TIME,
  FILTER_BY_MIN_SIZE,
  FILTER_BY_MAX_SIZE,
  FILTER_BY_MIN_SKILL,
  FILTER_BY_MAX_SKILL,
  FILTER_BY_LOCATION,
  RESET_FILTERS,
} from "../../actions/filter";
import {
  resetFilters,
  filterByName,
  filterBySport,
  filterByDate,
  filterByTime,
  filterByMinSize,
  filterByMaxSize,
  filterByMinSkill,
  filterByMaxSkill,
  filterByLocation,
} from "../../actions/filter";

test("should setups reset filters", () => {
  const action = resetFilters();
  expect(action).toEqual({ type: RESET_FILTERS });
});

test("should setups filter by name action object", () => {
  const payload = "test";
  const action = filterByName(payload);
  expect(action).toEqual({ type: FILTER_BY_NAME, payload });
});

test("should setups filter by sport action object", () => {
  const payload = ["test", "test1"];
  const action = filterBySport(payload);
  expect(action).toEqual({ type: FILTER_BY_SPORT, payload });
});

test("should set up filter by date action object", () => {
  const payload = "test";
  const action = filterByDate(payload);
  expect(action).toEqual({ type: FILTER_BY_DATE, payload });
});

test("should set up filter by time action object", () => {
  const payload = ["test", "evening"];
  const action = filterByTime(payload);
  expect(action).toEqual({ type: FILTER_BY_TIME, payload });
});

test("should set up filter by location action object", () => {
  const payload = ["test location"];
  const action = filterByLocation(payload);
  expect(action).toEqual({ type: FILTER_BY_LOCATION, payload });
});

test("should set up filter by min size action object", () => {
  const payload = 4;
  const action = filterByMinSize(payload);
  expect(action).toEqual({ type: FILTER_BY_MIN_SIZE, payload });
});

test("should set up filter by max size action object", () => {
  const payload = 8;
  const action = filterByMaxSize(payload);
  expect(action).toEqual({ type: FILTER_BY_MAX_SIZE, payload });
});

test("should set up filter by min skill action object", () => {
  const payload = 1;
  const action = filterByMinSkill(payload);
  expect(action).toEqual({ type: FILTER_BY_MIN_SKILL, payload });
});

test("should set up filter by max skill action object", () => {
  const payload = 5;
  const action = filterByMaxSkill(payload);
  expect(action).toEqual({ type: FILTER_BY_MAX_SKILL, payload });
});
