import moment from "moment";

const filters = {
  name: "",
  sport: [],
  date: moment(),
  time: [],
  location: [],
  minSize: 2,
  maxSize: 20,
  minSkill: 1,
  maxSkill: 5,
};

const event = {
  title: "",
  sport: "",
  size: 0,
  date: moment(),
  time: moment(),
  location: "mitte",
  host: "",
  about: "",
  court: "",
  teammates: "",
};

export { filters, event };
