import React from "react";
import { faShieldCheck, faLaptopCode } from "@fortawesome/pro-solid-svg-icons";
import { shallow } from "enzyme";
import ServiceItem from "./serviceItem";

describe("ServiceItem", () => {
  const secureDesc = (
      <>
        Applications need solid infrastructure. In our increasingly cloud-centric world we have the expertise to deploy
        your site or application quickly <strong>and</strong> <em>securely</em>
      </>
    ),
    services = [
      {
        name: "Software Development",
        icon: faLaptopCode,
        size: "2x",
        descr: `Whether it's a web application built using the latest web
    technologies, a C++ application for real-time systems, or
    customizing existing applications for your specific needs; we've
    got you covered.`,
      },
      {
        name: "Fast, Secure Hosting",
        icon: faShieldCheck,
        size: "2x",
        descr: secureDesc,
      },
    ];

  it("should render without crashing", () => {
    const wrapper = shallow(
      <ServiceItem icon={services[0].icon} serviceName={services[0].name}>
        {services[0].descr}
      </ServiceItem>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render without crashing without icons", () => {
    const wrapper = shallow(<ServiceItem serviceName={services[1].name}>{services[1].descr}</ServiceItem>);
    expect(wrapper).toMatchSnapshot();
  });
});
