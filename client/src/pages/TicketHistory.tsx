import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Locations from "../components/locations";
import Events from "../components/events";
import locations from "../components/locations";

const TicketHistory = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  //image state
  const [image, setImage] = useState<any | null>(null);


  const [, setCategoryDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const handleLocationClick = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
    setCategoryDropdownOpen(false);
  };

  const handleLocationSelect = (location: any) => {
    // Handle the selected location
    console.log(`Selected location: ${location}`);
    setLocationDropdownOpen(false);
  };

  function setFilters(_arg0: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="fixed left-0 z-30">
        <Sidebar />
      </div>
      <div className="pl-20 fixed top-0 w-full z-10">
          <Navbar
            name={mainUser.first_name}
            image={
              mainUser.profile_picture.length === 0
                ? "/images/event1.png"
                : mainUser.profile_picture
            }
          />
        </div>
      <div className="w-full sm:w-[80%] h-auto sm:h-[678px] flex-col md:px-32 justify-start items-start gap-4 inline-flex mt-32">
        <div className="w-[1180px] justify-between items-center inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-green-500 text-2xl font-semibold font-['Inter']">
              Ticket History
            </div>
            <div className="w-[200px] h-[0px] border-2 border-green-500"></div>
          </div>
          <div className="h-10 justify-center items-center gap-5 flex">
            {/* Category Dropdown */}

            <div>
              <Events
                placeholder={"Any Category"}
                text={"text-green-100 text-xs"}
                h={""}
                onChange={(eventType: any) =>
                  setFilters({ ...filters, eventType })
                }
              />
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer"
                onClick={handleLocationClick}
              ></div>
              <Locations
                placeholder={"Choose location"}
                text={"text-green-500 text-xs"}
                h={""}
                onChange={(location: any) =>
                  setFilters({ ...filters, location })
                }
              />
              {locationDropdownOpen && (
                <div className="absolute top-12 left-0 bg-white border rounded shadow-md">
                  <ul>
                    {locations.map((location) => (
                      <li
                        key={location}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <input
                type="date"
                name=""
                id=""
                className="text-slate-500 text-xs font-normal font-Inter bg-gray-50"
              />
            </div>
          </div>
        </div>
        <table className="w-full" id="tickets">
          <tr className="h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 text-gray-500 text-xs font-medium font-Inter tracking-tight">
            <th>ORDER NUMBER</th>
            <th>EVENT NAME</th>
            <th>EVENT CATEGORY</th>
            <th>ORDER DATE</th>
            <th>TICKET TYPE</th>
            <th>TOTAL</th>
          </tr>
          <tr className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-gray-800 text-sm font-medium font-Inter leading-tight tracking-tight">
            <td>F711060151001</td>
            <td>Neon Groove</td>
            <td>Festival</td>
            <td>25-12-2023</td>
            <td>VVIP</td>
            <td>₦ 20,000</td>
          </tr>
          <tr className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-gray-800 text-sm font-medium font-Inter leading-tight tracking-tight">
            <td>F711060151001</td>
            <td>Hollywood Glam</td>
            <td>Premier</td>
            <td>25-12-2023</td>
            <td>VIP</td>
            <td>₦ 20,000</td>
          </tr>
          <tr className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
            <td>F711060151001</td>
            <td>FitFam</td>
            <td>Fitness</td>
            <td>25-12-2023</td>
            <td>VVIP</td>
            <td>₦ 20,000</td>
          </tr>
          <tr className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
            <td>F711060151001</td>
            <td>Digital Realization</td>
            <td>Seminar</td>
            <td>25-12-2023</td>
            <td>VIP</td>
            <td> ₦ 20,000</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default TicketHistory;