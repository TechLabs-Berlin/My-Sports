import React from "react";
import { shallow } from "enzyme";
import SuccessPage from "../../components/SuccessPage";
import "../setupTests";

test("should render success page correctly", () => {
  const wrapper = shallow(<SuccessPage />);
  expect(wrapper.debug()).toMatchSnapshot();
});
