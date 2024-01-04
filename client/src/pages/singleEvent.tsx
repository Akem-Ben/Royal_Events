import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import SingleEventHeader from "../components/singleEventHeader";
import Cards from "../components/Cards";
import SingleEventBody from "../components/singleEventBody";
import { FaArrowLeft, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getSingleEvent, makeComments, upComingEvents } from "../axiosSettings/axios";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { useParams } from "react-router-dom";

function SingleEvent() {
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

    const addComments = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      try{
        setLoading(true)
        const params = localStorage.getItem("event_id")
        const body = {
          comment: newComment
        }
        const response = await makeComments(body, params)
        if(response.status !== 200){
          setLoading(false)
          return showErrorToast(response.data.message)
        }
        fetchData()
        setLoading(false)
        showSuccessToast(response.data.message)
        setNewComment("")
      }catch (error: any) {
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
    }
  return (
    <div className="w-screen">
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
          <SingleEventHeader
            title={event.title}
            description={event.description}
            address={event.location}
            date={`${event.event_date} ${event.event_time}`}
            image={event.event_image}
          />
          {/* description and map */}
          <div>
            <SingleEventBody
              description={event.description}
              time={event.event_time}
              organizerInfo={
                event.organizers?.map((a:any)=> a.name_of_organizer)
              }
            />
          </div>
          {/* comment section */}
          <div className="text-gray-900 text-base font-medium leading-snug tracking-tight py-4">
            Comments
          </div>
          <div className="p-5 w-full bg-white rounded-lg shadow border border-gray-300 flex-col">
            <div className="flex">
              <img
                src={mainUser.profile_picture?.length === 0
                  ? "/images/event1.png"
                  : mainUser.profile_picture}
                alt="profile_pic"
                className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
              />
              <h3 className="text-black text-lg pl-2 font-semibold">
                {mainUser.user_name}
              </h3>
            </div>
            <hr />
            <div className="w-full">
              <form className="flex justify-between w-full" onSubmit={(e:any)=> addComments(e)}>
                <div className="w-4/5">
                  <input
                    type="text"
                    className="h-12 w-full border border-gray-500 px-2 font-Inter"
                    required
                    value={newComment}
                    // name="comment"
                    onChange={(e)=> handleCommentChange(e)}
                  />
                </div>
                <div className="pl-2 w-1/5">
                  <Button
                    title={loading ? "Loading..." : "Comment"}
                    text={"white"}
                    bg={"green"}
                    type={"submit"}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="py-3 bg-gray-100 overflow-y-scroll h-[300px] p-[20px]">
          {comments && comments.map((comment:any, index:any) => (
            <div key={index}>
              <div className="flex">
                  <img
                    src={comment.user_image}
                    alt="profile_pic"
                    className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300" />
                  <h3 className="text-black text-lg pl-2 font-semibold">
                    {comment.user_name}
                  </h3>
                </div><p className="font-Inter">
                    {comment.comment}
                  </p><div className="flex justify-start font-Inter">
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
          {/* other events */}
          <div className="pb-4">
            <div className="text-gray-900 text-base font-medium font-Inter leading-snug tracking-tight">
              <div className="text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight py-4">
                Others you may like
              </div>
              <div className="flex gap-3 overflow-x-scroll">
              { upcomingEvents.length !== 0 ? ( upcomingEvents?.map((event:any, index:any) => (
                <div key={index}>
                <Cards
                  date={event.event_date}
                  ticketsNo={event.dataValues?.tickets_bought}
                  title={event.dataValues?.title}
                  description={
                    event.dataValues?.description
                  }
                  image={event.dataValues?.event_image}
                  id={event.dataValues.id}
                  event_details={event}
                />
              </div>
              ))):(
                null
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
