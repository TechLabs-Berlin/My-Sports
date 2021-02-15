import moment from "moment";
import FiltersReducer from "../../../reducers/event/filter";
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
} from "../../../actions/filter";

const filtersReducerDefaultState = {
  name: "",
  sport: [],
  date: "",
  time: [],
  location: [],
  minSize: 2,
  maxSize: 20,
  minSkill: 0,
  maxSkill: 5,
};

test("should return default state", () => {
  const state = FiltersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(filtersReducerDefaultState);
});

test("should reset to default state", () => {
  const state = FiltersReducer(undefined, { type: RESET_FILTERS });
  expect(state).toEqual(filtersReducerDefaultState);
});

test("should set filter by sport", () => {
  const payload = ["basketball"];
  const action = { type: FILTER_BY_SPORT, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.sport).toEqual(payload);
});

test("should add sport when sport doesn't exist in populated arary", () => {
  const payload = ["basketball"];
  const currentState = {
    name: "",
    sport: ["b-ball", "hoops"],
    date: "",
    time: [],
    location: [],
    minSize: 2,
    maxSize: 20,
    minSkill: 0,
    maxSkill: 5,
  };
  const action = { type: FILTER_BY_SPORT, payload };
  const state = FiltersReducer(currentState, action);
  expect(state.sport).toEqual(["b-ball", "hoops", "basketball"]);
});

test("should set filter by date", () => {
  const payload = moment();
  const action = { type: FILTER_BY_DATE, payload };
  const state = FiltersReducer(filtersReducerDefaultState, action);
  expect(state.date).toEqual(payload);
});

// test("should set filter by name", () => {
//   const payload = "basketball in Mitte";
//   const action = { type: FILTER_BY_NAME, payload };
//   const state = FiltersReducer(undefined, action);
//   expect(state.name).toEqual(payload);
// });

test("should set filter by minsize", () => {
  const payload = 4;
  const action = { type: FILTER_BY_MIN_SIZE, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.minSize).toBe(payload);
});

test("should set filter by maxsize", () => {
  const payload = 18;
  const action = { type: FILTER_BY_MAX_SIZE, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.maxSize).toBe(payload);
});

test("should set filter by minskill", () => {
  const payload = 4;
  const action = { type: FILTER_BY_MIN_SKILL, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.minSkill).toBe(payload);
});

test("should set filter by maxskill", () => {
  const payload = 3;
  const action = { type: FILTER_BY_MAX_SKILL, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.maxSkill).toBe(payload);
});

test("should set filter by location", () => {
  const payload = ["Mitte"];
  const action = { type: FILTER_BY_LOCATION, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.location).toEqual(payload);
});

test("should set filter by time", () => {
  const payload = ["Morning"];
  const action = { type: FILTER_BY_TIME, payload };
  const state = FiltersReducer(undefined, action);
  expect(state.time).toEqual(payload);
});
