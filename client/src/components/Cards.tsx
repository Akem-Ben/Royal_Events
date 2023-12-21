import React, { useState } from "react";
import Button from "./Button";

interface Props {
  date: string;
  ticketsNo: number;
  title: string;
  description: string;
  image: string;
}

function Card(props: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-[386.67px] h-[400px] pt-[282px] rounded-md flex-col justify-end items-center flex bg-cover bg-center transition-all duration-100 delay-200 z-20`}
      style={{ backgroundImage: `url(${props.image})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full transition-opacity duration-200 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Front of the card (Card component) */}
        <div className="absolute h-full w-full px-6 pt-2 pb-4 bg-opacity-10 rounded-md backdrop-blur-[3px] flex-col justify-end items-start gap-2 inline-flex">
          <div>
            <span className="text-white text-base font-medium font-Inter">
              {props.date}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
              /{" "}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              {props.ticketsNo}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
            </span>
            <span className="text-white text-base font-medium font-Inter">
              Tickets bought
            </span>
          </div>
          <div className="w-[338.67px]">
            <span className="text-white text-lg font-bold font-Inter leading-[25.20px] tracking-tight">
              {props.title}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              ,
            </span>
            <span className="text-white text-sm font-normal font-Inter leading-tight">
              {" "}
            </span>
            <span className="text-white text-sm font-medium font-Inter leading-tight">
              {props.description}
            </span>
          </div>
        </div>
      </div>

      {/* Back of the card (Card2 component) */}
      <div
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="px-6 h-full w-full pb-4 bg-black bg-opacity-10 rounded-md rounded-br-md backdrop-blur-[2px] flex-col justify-end items-start gap-2 inline-flex">
          <div>
            <span className="text-white text-base font-medium font-Inter">
              {props.date}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
              /{" "}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              {props.ticketsNo}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
            </span>
            <span className="text-white text-base font-medium font-Inter">
              Tickets bought
            </span>
          </div>
          <div className="w-[338.67px]">
            <span className="text-white text-lg font-bold font-Inter leading-[25.20px] tracking-tight">
              {props.title}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              ,
            </span>
            <span className="text-white text-sm font-normal font-Inter leading-tight">
              {" "}
            </span>
            <span className="text-white text-sm font-medium font-Inter leading-tight">
              {props.description}
            </span>
          </div>
          <Button
            title={"BUY TICKETS"}
            text={"white"}
            bg={"#27AE60"}
            type={"submit"}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
