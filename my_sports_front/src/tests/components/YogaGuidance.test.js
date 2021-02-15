import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import YogaGuidance from "../../components/YogaGuidance";
import "../setupTests";

test("should render yoga guidance correctly", () => {
  const wrapper = shallow(<YogaGuidance />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
