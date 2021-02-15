import React from "react";
import { shallow } from "enzyme";
import BoulderingGuidance from "../../components/BoulderingGuidance";
import "../setupTests";

test("should render bouldering guidance correctly", () => {
  const wrapper = shallow(<BoulderingGuidance />);
  expect(wrapper.debug()).toMatchSnapshot();
});
