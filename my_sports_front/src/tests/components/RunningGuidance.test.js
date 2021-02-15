import React from "react";
import { shallow } from "enzyme";
import RunningGuidance from "../../components/RunningGuidance";
import "../setupTests";

test("should render running guidance correctly", () => {
  const wrapper = shallow(<RunningGuidance />);
  expect(wrapper.debug()).toMatchSnapshot();
});
