import React from "react";
import Navbar from "../../src/components/Navbar";
import Sidebar from "../../src/components/Sidebar";

const TicketHistory = () => {
  return (
    <>
      <div className="fixed left-0">
        <Sidebar />
      </div>
      <div className="pl-20 pb-10">
        <Navbar name={"Praise"} image={"Him"} />
      </div>
      <div className="w-[1440px] h-[1024px] relative bg-white">
        <div className="w-[107px] left-0 top-0 absolute bg-green-500 flex-col justify-start items-start inline-flex">
          <div className="w-[107px] grow shrink basis-0 px-8 py-[50px] flex-col justify-start items-start gap-[50px] flex">
            <div className="text-center">
              <span className="text-white text-[32px] font-normal font-['Imperial Script'] leading-[44.80px]">
                D
              </span>
              <span className="text-emerald-900 text-[32px] font-normal font-['Imperial Script'] leading-[44.80px]">
                E
              </span>
            </div>

            <div className="flex-col justify-center items-center gap-8 flex">
              <img className="w-6 h-6" src="../images/homeIcon.png" />
              <img className="w-6 h-6" src="../images/eventsIcon.png" />
              <img className="w-6 h-6" src="../images/TicketIcon.png" />
              <img className="w-6 h-6" src="../images/profileIcon.png" />
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="p-2 bg-white bg-opacity-10 rounded-md justify-start items-center gap-2 inline-flex">
                  <div className="w-6 h-6 relative">
                    <div className="w-[21.77px] h-[11.57px] left-[1.12px] top-[6.23px] absolute"></div>
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 relative">
                <div className="h-[19.22px] left-[4px] top-[2.50px] absolute"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[1333px] pl-[60px] pr-[120px] py-3.5 left-[107px] top-0 absolute bg-white justify-between items-center inline-flex">
          <div className="h-11 px-6 py-2.5 bg-white rounded-[100px] border border-gray-300 justify-start items-center gap-2.5 flex">
            <div className="justify-start items-center gap-2 flex">
              <img className="w-6 h-6" src="../images/searchIcon.png" />
              <div className="text-gray-400 text-base font-normal font-['Inter'] leading-snug tracking-tight">
                Search
              </div>
            </div>
          </div>

          <div className="justify-start items-center gap-8 flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative flex-col justify-start items-start flex"></div>
              <img
                className="w-6 h-6"
                src="../images/notifications.png"
                alt="Notification Bell"
              />
            </div>
            <div className="justify-start items-center gap-2 flex">
              <img
                className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                src="../images/profilePicture.png"
              />
              <div className="text-gray-900 text-base font-normal font-['Inter'] leading-snug tracking-tight">
                Desmond
              </div>
            </div>
          </div>
        </div>
        <div className="left-[130px] top-[96px] absolute flex-col justify-start items-start gap-6 inline-flex">
          <div className="w-[1180px] justify-between items-center inline-flex">
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="text-green-500 text-2xl font-semibold font-['Inter']">
                Ticket History
              </div>
              <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
            </div>
            <div className="h-10 justify-center items-center gap-5 flex">
              <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
                  Any category
                </div>
                <div className="w-6 h-6 relative"></div>
              </div>
              <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
                  Lagos
                </div>
                <div className="w-6 h-6 relative"></div>
              </div>
              <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
                  25/12/2023
                </div>
                <div className="w-6 h-6 relative"></div>
                <img
                  className="w-6 h-6"
                  src="../images/Calendar.png"
                  alt="Calendar"
                />
              </div>
            </div>
          </div>
          <div className="h-[216px] flex-col justify-start items-start flex">
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                <div className="self-stretch h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                  <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                    ORDER NUMBER
                  </div>
                </div>
                <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                  <input
                    type="text"
                    className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight focus:outline-none"
                    placeholder="F711060151001"
                  />
                </div>
                <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                  <input
                    type="text"
                    className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight focus:outline-none"
                    placeholder="F711060151001"
                  />
                </div>
                <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                  <input
                    type="text"
                    className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight focus:outline-none"
                    placeholder="F711060151001"
                  />
                </div>
                <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                  <input
                    type="text"
                    className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight focus:outline-none"
                    placeholder="F711060151001"
                  />
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                      EVENT NAME
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Neon Groove
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      {" "}
                      Hollywood Glam
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      FitFam
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Digital Realization
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                      EVENT CATEGORY
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Festival
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Premier
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Fitness
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Seminar
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                      ORDER DATE
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      25-12-2023
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      25-12-2023
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      25-12-2023
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      25-12-2023
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                      TICKET TYPE
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      VVIP
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      VIP
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      VVIP
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      VIP
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                      TOTAL
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      ₦ 20,000
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      ₦ 20,000
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      ₦ 20,000
                    </div>
                  </div>
                  <div className="self-stretch h-11 px-5 py-3 bg-gray-50 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      ₦ 20,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketHistory;
