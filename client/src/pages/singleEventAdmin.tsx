import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaArrowLeft,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
  FaTwitter,
} from "react-icons/fa6";
import Button from "../components/Button";
import "./table.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent, upComingEvents } from "../axiosSettings/events/eventAxios";
import { showErrorToast, showSuccessToast } from "../utility/toast";

function SingleEventAdmin() {
  const user:any = localStorage.getItem("user")
  const mainUser:any = JSON.parse(user)
  // const event_id = localStorage.getItem("event_id")
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>({})
  const [comments, setComments] = useState<any>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<any>([])

  function formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  function formatDateTime(dateString: any) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
}
  const locate = localStorage.getItem("location")
  const fetchData = async()=>{
    try{
      const response = await getSingleEvent(eventId)
      console.log('data',response)
      response.data.data.event_date = formatDate(response.data.data.event_date)
      const test = response.data.data.comments
      test.map((a:any)=> {
        a.comment_time = formatDateTime(a.comment_time)
      })
      response.data.data.comments.length !== 0 ? setComments(test) : null
      setEvent(response.data.data)
      return response.data.data
      }catch(error:any){
          console.log(error)
      }
  }

  const fetchUpcomingEvents = async()=>{
    try{
      const response = await upComingEvents()
     return setUpcomingEvents(response)
    }catch(error:any){
      console.log(error)
    }
  }
  useEffect(()=>{
      fetchData();
      fetchUpcomingEvents();
  }, [])

  const handleCommentChange = async(e:any)=>{
    try{
      e.preventDefault()
      console.log('er',upcomingEvents)
      let target = e.target.value
      setNewComment(target)
    }catch(error:any){
      console.log(error)
    }
  }

  // const addComments = async(e:React.FormEvent<HTMLFormElement>)=>{
  //   e.preventDefault()
  //   try{
  //     setLoading(true)
  //     const params = localStorage.getItem("event_id")
  //     const body = {
  //       comment: newComment
  //     }
  //     // const response = await makeComments(body, params)
  //     if(response.status !== 200){
  //       setLoading(false)
  //       return showErrorToast(response.data.message)
  //     }
  //     fetchData()
  //     setLoading(false)
  //     showSuccessToast(response.data.message)
  //     setNewComment("")
  //   }catch (error: any) {
  //     if (error.response) {
  //       return showErrorToast(error.response.data.message);
  //     }
  //     if (error.request) {
  //       return showErrorToast("Network Error");
  //     }
  //     if (error.message) {
  //       return showErrorToast(error.message);
  //     }
  //   }
  // }
  return (
    <div className="w-screen pb-5">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="pl-24">
        <div>
          <Navbar
           name={mainUser.first_name} image={mainUser.profile_picture?.length === 0
            ? "/images/event1.png"
            : mainUser.profile_picture}
          />
        </div>
        <div className="ml-16 mr-16 mt-2">
          <div className="pl-8 my-2">
          <a href={`http://localhost:5173${locate}`} className="no-underline text-black">
              <div className="flex">
                <FaArrowLeft className="text-black" />{" "}
                <p className="pl-2">Back</p>
              </div>
            </a>
          </div>
          <div
            className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
            style={{
              backgroundImage: `url(${event.event_image})`,
            }}
          >
            <div className="flex px-20 text-white justify-end py-5">
              <div>
                <a href="facebook.com" className="w-8 h-8">
                  <FaTrash className="text-red-500 w-full h-full p-2 bg-white rounded-full" />
                </a>
              </div>
            </div>

            <div className="flex px-20 text-white justify-between pt-35">
              <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
                <h1 className="text-white text-[64px] font-['Inter']">
                {event.title}
                </h1>
                <div className="text-white text-base font-Inter">
                {event.description}
                </div>
                <div className="relative">
                  <div className="left-[29px] top-0 text-white text-lg font-normal font-['Inter']"></div>
                </div>
              </div>
              {/* right div */}
              <div className="bg-white rounded-[10px] shadow p-10">
                <div className="text-black text-2xl font-normal font-Inter pb-4">
                  Date & time
                </div>
                <div className="text-zinc-500 text-lg font-normal font-Inter pb-4">
                {event.event_time}
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
          <div className="flex justify-between pt-5">
            <div className="w-6/12">
              <p className="font-medium">Description</p>
              <p className="font-Inter">
              {event.description}
              </p>
            </div>
            <div className="w-5/12">
              <p className="pt-3 font-medium">Time</p>
              <p className="font-Inter">
                {/* Weekdays hours:{" "} */}
                <span className="text-green-500">{event.event_time}</span>
                <br />
                {/* Weekends hours: <span className="text-green-500">7PM- 8PM</span> */}
              </p>
              <p className="text-black font-medium pt-3">Share with friends</p>
              <div>
                <div className="w-32 h-8 md:w-96 flex gap-3">
                  <a href="facebook.com" className="w-8 h-8">
                    <FaFacebookF className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </a>
                  <a href="instagram.com" className="w-8 h-8">
                    <FaInstagram className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </a>
                  <a href="instagram.com" className="w-8 h-8">
                    <FaTelegram className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </a>
                  <a href="instagram.com" className="w-8 h-8">
                    <FaTwitter className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </a>
                  <a href="instagram.com" className="w-8 h-8">
                    <FaEnvelope className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* comment section */}
          <div className="text-gray-900 text-base font-medium leading-snug tracking-tight py-4">
            Comments
          </div>
          <div className="py-3">
          {comments && comments.map((comment:any, index:any) => (
            <div key={index}>
              <div className="flex">
                <img
                  src={comment.user_image}
                  alt="profile_pic"
                  className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                />
                <h3 className="text-black text-lg pl-2 font-semibold">
                {comment.user_name}
                </h3>
              </div>
              <p className="font-Inter">
              {comment.comment}
              </p>
              <div className="flex justify-start font-Inter">
                <a href="#" className="w-8 h-8">
                  <FaThumbsUp className="" />
                </a>
                <a href="#" className="w-8 h-8">
                  <FaThumbsDown className="" />
                </a>
                <p>{comment.comment_time}</p>
              </div>
            </div>
             ))}
             {comments.length === 0 && <p>No comments yet.</p>}
          </div>
          <div className="w-full">
            <div className="text-gray-900 text-base text-center font-medium leading-snug tracking-tight py-4">
              Purchased Tickets
            </div>
            <table className="w-full text-gray-500 font-Inter text-xs">
              <thead className="w-full">
                <td className="w-1/4">NAME</td>
                <td className="w-1/4">EMAIL</td>
                <td className="w-1/4">TICKET TYPE</td>
                <td className="w-1/4">TOTAL</td>
              </thead>
              <tbody>
                <tr className="table-style">
                  <td className="flex">
                    <img
                      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                      alt="profile_pic"
                      className="w-7 h-7 relative rounded-[200px] border-2 border-gray-300"
                    />{" "}
                    <p className="pl-3">John Doe</p>{" "}
                  </td>
                  <td>jd@gmail.com</td>
                  <td>VIP</td>
                  <td>1</td>
                </tr>
                <tr className="table-style">
                  <td className="flex table-style">
                    <img
                      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                      alt="profile_pic"
                      className="w-7 h-7 relative rounded-[200px] border-2 border-gray-300"
                    />{" "}
                    <p className="pl-3">John Doe</p>{" "}
                  </td>
                  <td>jd@gmail.com</td>
                  <td>VIP</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEventAdmin;
