import React from "react";

export default function SkeletonEventCard({ number, cardType = "small" }) {
  return Array(number)
    .fill(0)
    .map((el, index) => (
      <React.Fragment
        key={`${
          cardType === "small" ? "small" : "medium"
        }-${index}-skeleton-card`}
      >
        {cardType === "small" ? (
          <li key={index}>
            <div className="px-[0.8rem] py-[1.6rem] w-[32rem] h-[14rem] items-center shadow-xl rounded-[0.8rem] gap-[0.8rem] flex">
              <div className="rounded-[0.4rem] bg-accent-light-gray min-w-[10rem] min-h-[10rem] w-[10rem] h-[10rem] animate-pulse"></div>
              <div className="flex flex-col w-full h-full justify-between">
                <span className="w-1/2 bg-accent-light-gray h-[1.6rem] rounded-full animate-pulse"></span>
                <span className="w-1/4 bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
                <span className="w-full bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
                <span className="w-full bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
                <span className="w-1/4 bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
                <span className="w-1/4 bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
              </div>
            </div>
          </li>
        ) : cardType === "medium" ? (
          <li key={index}>
            <div className="px-[0.8rem] py-[0.8rem] min-w-[28rem] max-w-[28rem] h-[32rem] bg-background shadow-xl rounded-[0.8rem] flex flex-col gap-[0.8rem] no-underline flex-grow">
              <span className="w-1/2 bg-accent-light-gray h-[1.6rem] rounded-full animate-pulse"></span>
              <span className="w-9/12 bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
              <div className="rounded-[0.4rem] bg-accent-light-gray w-[26.4rem] h-[12.5rem] animate-pulse"></div>
              <span className="w-1/4 bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
              <span className="w-full bg-accent-light-gray h-[1.2rem] rounded-full animate-pulse"></span>
            </div>
          </li>
        ) : null}
      </React.Fragment>
    ));
}
