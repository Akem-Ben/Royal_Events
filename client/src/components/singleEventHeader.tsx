import { FaFlag } from "react-icons/fa6";
import Button from "./Button";

interface Props {
  title: string;
  description: string;
  address: string;
  date: string;
  image: string;
}

function SingleEventHeader(props: Props) {
  return (
    <div
      className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="flex px-20 text-white justify-end py-5">
        <div>
          <a href="facebook.com" className="w-8 h-8">
            <FaFlag className="text-green-500 w-full h-full p-2 bg-white rounded-full" />
          </a>
        </div>
      </div>

      <div className="flex px-20 text-white justify-between pt-35">
        <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
          <h1 className="text-white text-[64px] font-['Inter']">
            {props.title}
          </h1>
          <div className="text-white text-base font-Inter">
            {props.description}
          </div>
          <div className="relative">
            <div className="left-[29px] top-0 text-white text-lg font-normal font-['Inter']">
              {props.address}{" "}
            </div>
          </div>
        </div>
        {/* right div */}
        <div className="bg-white rounded-[10px] shadow p-10">
          <div className="text-black text-2xl font-normal font-Inter pb-4">
            Date & time
          </div>
          <div className="text-zinc-500 text-lg font-normal font-Inter pb-4">
            {props.date}
          </div>

          <div className="text-green-500 text-base font-normal font-Inter pb-4">
            Add to calendar
          </div>
          <div className="self-stretch gap-2.5 inline-flex pb-4">
            <Button
              title={"Book Now"}
              text={"white"}
              bg={"green"}
              type={"button"}
            />
          </div>
          <div className="text-center text-zinc-500 text-base font-normal font-['Inter']">
            No Refunds
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEventHeader;
