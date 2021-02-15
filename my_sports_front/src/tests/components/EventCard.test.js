import React from "react";
import { shallow } from "enzyme";
import EventCard from "../../components/EventCard";
import moment from "moment";
import "../setupTests";

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

test("should render event card correctly", () => {
  const wrapper = shallow(<EventCard event={event} />);
  expect(wrapper.debug()).toMatchSnapshot();
});
