import React from "react";
import { shallow } from "enzyme";
import GeneralSportsGuidance from "../../components/GeneralSportsGuidance";
import "../setupTests";

test("should render general sports guidance correctly", () => {
  const wrapper = shallow(<GeneralSportsGuidance />);
  expect(wrapper.debug()).toMatchSnapshot();
});
