import events from "../assets/events.svg";
import home from "../assets/home.svg";
import profile from "../assets/profile.svg";
import tickets from "../assets/Ticket.svg";

function Sidebar() {
  return (
    <div className="w-[107px] h-[1024px] bg-green-500 flex-col justify-start items-start inline-flex z-30">
      <div className="w-[107px] grow shrink basis-0 px-8 py-[50px] flex-col justify-start items-start gap-[50px] flex">
        <div className="text-center">
          <span className="text-white text-[32px] font-normal font-Imperial leading-[44.80px]">
            D
          </span>
          <span className="text-emerald-900 text-[32px] font-normal font-Imperial leading-[44.80px]">
            E
          </span>
        </div>
        <div className="flex-col justify-center items-center gap-8 flex ">
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <img src={home} />
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <img src={events} />
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <img src={tickets} />
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <img src={profile} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
