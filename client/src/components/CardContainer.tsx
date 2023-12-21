import Card from "../components/Cards";
import '../index.css'

function CardContainer() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
      <div className="w-96 h-60 cursor-pointer card">
        <Card
          image={"/images/event1.jpeg"}
          date={"25 of Dec, 2023"}
          ticketsNo={0}
          title={"Neon Groove"}
          description={
            "Infuse vibrant neon colors, glow-in-the-dark elements, and energetic music for a lively and immersive experience."
          }
        />
      </div>
      <div className="w-96 h-60 cursor-pointer card">
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
      </div>
    </div>
  );
}

export default CardContainer;
