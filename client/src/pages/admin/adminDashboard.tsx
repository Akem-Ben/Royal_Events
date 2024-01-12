import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Cards";
import Events from "../../components/events";
import Locations from "../../components/locations";
import { useEffect, useState } from "react";
import { upComingEvents } from "../../axiosSettings/events/eventAxios";
import { showErrorToast } from "../../utility/toast";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export const AdminDashboard = () => {
  const user: any = localStorage.getItem("user");
  const newUser = JSON.parse(user);

  const [filters, setFilters] = useState({
    eventType: "",
    location: "",
    date: "",
  });
  const [getEvents, setGetEvents] = useState<any>([]);

  const params = {
    eventType: filters.eventType,
    location: filters.location,
    date: filters.date,
  };
  const fetchData = async () => {
    try {
      const response = await upComingEvents(params);
      console.log(response.data);
      if (response.data.length !== 0) {
        return setGetEvents(response.data);
      } else {
        return showErrorToast("No upcoming Events found");
      }
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);
  return (
    <>
      <div className="fixed left-0">
        <Sidebar />
      </div>

      <div className="pl-20">
        <Navbar
          name={newUser.first_name}
          image={
            newUser.profile_picture.length === 0
              ? "/images/event1.png"
              : newUser.profile_picture
          }
        />
      </div>

      <div className="w-full">
        <div className="pl-[160px] w-[1180px] mt-12 h-10 justify-between items-center inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-green-500 text-2xl font-semibold font-['Inter']">
              New Events
            </div>
            <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <Events
              placeholder={"Any category"}
              text={"text-grey-500 text-xs"}
              h={""}
              onChange={(eventType) => setFilters({ ...filters, eventType })}
            />
            <Locations
              placeholder={"Choose location"}
              text={"text-grey text-xs"}
              h={""}
              onChange={(location) => setFilters({ ...filters, location })}
            />
            <div className="h-10 rounded-[5px] justify-between items-center flex gap-2">
              <button>
                <MdKeyboardDoubleArrowLeft className="text-gray-200 text-2xl border-1 border-gray-200" />
              </button>
              <button>
                <MdKeyboardDoubleArrowRight className="text-green-500 text-2xl border-1 border-green-500" />
              </button>
            </div>
          </div>
        </div>
        {getEvents.length ? (
          <div className="flex-wrap mt-6 ml-40 gap-3 flex">
            {getEvents.map((event: any) => (
              <div key={event.dataValues.id}>
                <Card
                  image={event.dataValues.event_image}
                  date={event.event_date}
                  ticketsNo={event.dataValues.tickets_bought}
                  title={event.dataValues.title}
                  description={event.dataValues.description}
                  id={event.dataValues.id}
                  event_details={event}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="ml-[11%] mt-[2%]">No New Events</p>
        )}
      </div>

      <div className="w-full">
        <div className="pl-[160px] w-[1180px] mt-12 h-10 justify-between items-center inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-green-500 text-2xl font-semibold font-['Inter']">
              Flagged Events
            </div>
            <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <Events
              placeholder={"Any category"}
              text={"text-grey-500 text-xs"}
              h={""}
              onChange={(eventType) => setFilters({ ...filters, eventType })}
            />
            <Locations
              placeholder={"Choose location"}
              text={"text-grey text-xs"}
              h={""}
              onChange={(location) => setFilters({ ...filters, location })}
            />
            <div className="h-10 rounded-[5px] justify-between items-center flex gap-2">
              <button>
                <MdKeyboardDoubleArrowLeft className="text-gray-200 text-2xl border-1 border-gray-200" />
              </button>
              <button>
                <MdKeyboardDoubleArrowRight className="text-green-500 text-2xl border-1 border-green-500" />
              </button>
            </div>
          </div>
        </div>
        {getEvents.length ? (
          <div className="flex-wrap mt-6 ml-40 gap-3 flex">
            {getEvents.map((event: any) => (
              <div key={event.dataValues.id}>
                <Card
                  image={event.dataValues.event_image}
                  date={event.event_date}
                  ticketsNo={event.dataValues.tickets_bought}
                  title={event.dataValues.title}
                  description={event.dataValues.description}
                  id={event.dataValues.id}
                  event_details={event}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="ml-[11%] mt-[2%]">No Flageed Events</p>
        )}
      </div>
    </>
  );
};
