import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import MoodDay from "./MoodDay";

describe("<MoodDay />", () => {
  it("works correctly", () => {
    const wrapper = shallow(
      <MoodDay day={0} dataMood={0} isActive={true} setActiveDay={() => {}} />
    );
  });

  it("has active class if is the active day", () => {
    const wrapper = shallow(
      <MoodDay day={0} dataMood={0} isActive={true} setActiveDay={() => {}} />
    );
    expect(wrapper.find("button").hasClass("active")).toBe(true);
  });

  it("does not have active class if is the day is not active", () => {
    const wrapper = shallow(
      <MoodDay day={0} dataMood={0} isActive={false} setActiveDay={() => {}} />
    );
    expect(wrapper.find("button").hasClass("active")).toBe(false);
  });
});
