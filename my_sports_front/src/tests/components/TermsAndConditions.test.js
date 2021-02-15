import React from "react";
import { shallow } from "enzyme";
import TermsAndConditions from "../../components/TermsAndConditions";
import "../setupTests";

test("should render terms and conditions correctly", () => {
  const wrapper = shallow(<TermsAndConditions />);
  expect(wrapper.debug()).toMatchSnapshot();
});
