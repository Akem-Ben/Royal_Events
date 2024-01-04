import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Cards";
import { Key, useEffect, useState } from "react";
import { showToast, showErrorToast } from "../utility/toast";
import Events from "../components/events";
import Locations from "../components/locations";
import { upComingEvents } from "../axiosSettings/axios";

export const UpcomingEvents = () => {
  let user: any = localStorage.getItem("user");
  let newUser = JSON.parse(user);
  const [filters, setFilters] = useState({
    eventType: "",
    location: "",
    date: "",
  });
  const [getEvents, setGetEvents] = useState([])

  const handleDate = async (e:any) => {
    try{
        e.preventDefault()
        const date = e.target.value
        const originalDate = new Date(date);
        const isoDateString = originalDate.toISOString();

        setFilters({...filters, date:isoDateString})

    }catch(error:any){
        console.log(error)
    }
  }
  const fetchData = async () => {
    try {
      const params = {
        eventType: filters.eventType,
        location: filters.location,
        date: filters.date,
      }
      const response:any = await upComingEvents(params)

      if(response.length !== 0){
        return setGetEvents(response);
      }else{
        return showErrorToast("no upcoming events")
      }
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      }
      if (error.request) {
        return showErrorToast("Network Error");
      }
      if (error.message) {
        return showErrorToast(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  },[filters]);

  return (
    <>
      <div className="fixed">
        <Sidebar />
      </div>

      <div className="pl-[100px]">
        <Navbar
          name={newUser.first_name}
          image={
            newUser.profile_picture.length === 0
              ? "/images/event1.png"
              : newUser.profile_picture
          }
        />
      </div>

      <div className="pl-[160px] w-[1180px] mt-12 h-10 justify-between items-center inline-flex">
        <div className="flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-green-500 text-2xl font-semibold font-['Inter']">
            Upcoming Events
          </div>
          <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
        </div>
        <div className="h-10 justify-center items-center flex">
          <div className="h-10 px-4 py-2 rounded-[5px] justify-between items-center flex">
            <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
              <Events
                placeholder={"Any category"}
                text={"text-grey-500 text-xs"}
                h={""}
                onChange={(eventType) => setFilters({ ...filters, eventType })}
              />
            </div>
            <div className="w-6 h-6 relative" />
          </div>
          <div className="h-10 px-4 py-2 rounded-[5px] justify-between items-center flex">
            <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
            <Locations
              placeholder={"Choose location"}
              text={"text-grey text-xs"}
              h={""}
              onChange={(location) => setFilters({ ...filters, location })}
            />
            </div>
            <div className="w-6 h-6 relative" />
          </div>
          <div className="h-10 px-4 py-2 rounded-[5px] bg-gray-200 justify-between items-center flex">
            <div className=" cursor-pointer text-slate-500 font-normal font-['Inter'] leading-none tracking-tight">
            <input
                type="date"
                name=""
                id=""
                className="text-green-500 bg-gray-200 w-[120px] h-[20px] text-[16px] font-normal font-Inter cursor-pointer"
                onChange={handleDate}
              />
            </div>
            <div className="w-6 h-6 relative" />
          </div>
        </div>
      </div>
      {getEvents.length ? (
      <div className="flex-wrap mt-6 ml-40 gap-3 flex">
      {getEvents?.map((event:any) => (
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
): (<p className="ml-[11%] mt-[2%]">No Upcoming Events Found</p>)

}
    </>
  );
};
