"use client";

import React, { useState } from "react";
import AppButton from "@/app/components/atoms/AppButton";

const RouteMaps = ({ currentEvent, routes }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        {routes.map((link, index) => {
          return (
            <iframe
              title={`${index} ${currentEvent.title}`}
              key={`iframe-${index}-${currentEvent.title}`}
              id="iframe"
              src={`https://plugin.routeyou.com/routeviewer/basic/?key=${
                process.env.NEXT_PUBLIC_ROUTEYOU_API_KEY
              }${`&params.route.id=${link}`}&language=en&title.visible=false&detail.show.header=false&tabPane.position=null&map.api.key=${
                process.env.NEXT_PUBLIC_ROUTEYOU_MAP_API_KEY
              }&map.route.line.normal.standard.color=%2a2a2a&map.route.line.normal.standard.width=5&map.route.line.normal.standard.opacity=1&map.route.line.normal.standard.fill.color=%2a2a2a&map.route.line.normal.standard.fill.width=3&map.route.line.normal.standard.fill.opacity=0.7&map.route.line.normal.satellite.color=%2a2a2a&style.fill.color=%2a2a2a&style.fill.opacity=0.73&style.line.width=&style.line.color=%2a2a2a&map.type=terrain&map.show.instruction=false&map.show.positionData=false&profile.show.profile=false&map.show.profileControl=false`}
              width="100%"
              allow="geolocation"
              frameborder="0"
              className={`transition duration-700 ease-in-out w-full h-[40rem] ${
                activeTab === index ? "block" : "hidden"
              }`}
            ></iframe>
          );
        })}
      </div>
      {routes.length > 1 && (
        <div className="flex flex-row flex-wrap gap-8 p-6">
          <AppButton
            innerText="Previous"
            className="flex-1"
            disabled={activeTab === 0}
            handleClick={() => {
              activeTab >= 1 ? setActiveTab(activeTab - 1) : "";
            }}
          ></AppButton>
          <AppButton
            innerText="Next"
            className="flex-1"
            disabled={activeTab === routes.length - 1}
            handleClick={() => {
              activeTab <= routes.length ? setActiveTab(activeTab + 1) : "";
            }}
          ></AppButton>
        </div>
      )}
    </div>
  );
};

export default RouteMaps;
