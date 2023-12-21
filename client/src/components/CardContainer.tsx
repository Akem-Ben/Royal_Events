import Card from "../components/Cards";
import '../index.css'
import axios from '../configurations/httpSetup';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function CardContainer({ filters }:any) {
const navigate = useNavigate()
const [events, setEvevnts] = useState<any[]>([]);

  const fetchData = async () => {
    try {
        navigate('/');
        const response = await axios.get('/events/upcoming_events');
        setEvevnts(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
  fetchData();
}, []);

const filteredEvents = events.filter(event => {
  return (
    (!filters.type || event.type === filters.type) &&
    (!filters.location || event.location === filters.location) &&
    (!filters.event_start_date || event.event_start_date === filters.event_start_date)
  );
});
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
       {filteredEvents.map((event, index) => (
        <div className="w-96 h-60 cursor-pointer card" key={index}>
          <Card
            image={event.dataValues.event_image}
            date={`${event.event_start_date} - ${event.event_end_date}`} // Assuming event.date is in the correct format
            ticketsNo={event.dataValues.tickets_bought}
            title={event.dataValues.title}
            description={event.dataValues.description}
          />
        </div>
      ))}
      {/* <div className="w-96 h-60 cursor-pointer card">
        <Card
          image={"/images/event2.jpeg"}
          date={"25 of Dec, 2023"}
          ticketsNo={0}
          title={"Expression Unveiled"}
          description={
            "Celebrate diverse forms of artistic expression with unique installations, interactive exhibits, and expressive artwork."
          }
        />
      </div>
      <div className="w-96 h-60 cursor-pointer card">
        <Card
          image={"/images/event3.jpeg"}
          date={"25 of Dec, 2023"}
          ticketsNo={0}
          title={"Couture Elegance"}
          description={
            "Showcase high-end fashion in a sophisticated setting with glamorous runway designs and chic décor."
          }
        />
      </div>
      <div className="w-96 h-60 cursor-pointer card">
        <Card
          image={"/images/event4.jpeg"}
          date={"25 of Dec, 2023"}
          ticketsNo={0}
          title={"FitFest"}
          description={
            "Promote health and wellness with fitness challenges, wellness booths, and an energetic, dynamic atmosphere."
          }
        />
      </div>
      <div className="w-96 h-60 cursor-pointer card">
        <Card
          image={"/images/event5.jpeg"}
          date={"25 of Dec, 2023"}
          ticketsNo={0}
          title={"Hollywood Glam"}
          description={
            "Promote health and wellness with fitness challenges, wellness booths, and an energetic, dynamic atmosphere."
          }
        />
      </div>
      <div className="w-96 h-60 cursor-pointer card">
        <Card
          image={"/images/event6.jpeg"}
          date={"25 of Dec, 2023"}
          ticketsNo={0}
          title={"Digital Frontier"}
          description={
            "Highlight the latest advancements in technology with futuristic aesthetics, interactive displays, and expert speakers."
          }
        />
      </div> */}
    </div>
  );
}

export default CardContainer;
