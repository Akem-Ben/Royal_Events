import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Cards";

export const UpcomingEvents = () => {
    let user:any = localStorage.getItem("user")
    let newUser = JSON.parse(user)
    console.log(newUser)
    return (
        <>
            <div className="fixed">
                <Sidebar />
            </div>

            <div className="pl-[100px]">
                <Navbar name={`${newUser.first_name}`} image={ newUser.profile_picture.length === 0 ? "/images/event1.png" : newUser.profile_picture} />
            </div>

            <div className="pl-[160px] w-[1180px] mt-12 h-10 justify-between items-center inline-flex">
                <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="text-green-500 text-2xl font-semibold font-['Inter']">Upcoming Events</div>
                    <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
                </div>
                <div className="h-10 justify-center items-center gap-5 flex">
                    <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                        <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">Any category</div>
                        <div className="w-6 h-6 relative" />
                    </div>
                    <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                        <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">Lagos</div>
                        <div className="w-6 h-6 relative" />
                    </div>
                    <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                        <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">25/12/2023</div>
                        <div className="w-6 h-6 relative" />
                    </div>
                </div>
            </div>

            <div className="flex-wrap mt-6 ml-40 gap-3 flex">
                <Card
                image={"/images/event1.png"}
                date={"25 of Dec, 2023"}
                ticketsNo={0}
                title={"Neon Groove"}
                description={
                    "Infuse vibrant neon colors, glow-in-the-dark elements, and energetic music for a lively and immersive experience."
                }
                />
                <Card
                image={"/images/event2.jpeg"}
                date={"25 of Dec, 2023"}
                ticketsNo={0}
                title={"Expression Unveiled"}
                description={
                    "Celebrate diverse forms of artistic expression with unique installations, interactive exhibits, and expressive artwork."
                }
                />
                <Card
                image={"/images/event3.jpeg"}
                date={"25 of Dec, 2023"}
                ticketsNo={0}
                title={"Couture Elegance"}
                description={
                    "Showcase high-end fashion in a sophisticated setting with glamorous runway designs and chic décor."
                }
                />
                <Card
                image={"/images/event4.png"}
                date={"25 of Dec, 2023"}
                ticketsNo={0}
                title={"Fitness Training"}
                description={
                    "Promote health and wellness with fitness challenges, wellness booths, and an energetic, dynamic atmosphere."
                }
                />
                <Card
                image={"/images/event5.jpeg"}
                date={"25 of Dec, 2023"}
                ticketsNo={0}
                title={"Hollywood Glam"}
                description={
                    "Promote health and wellness with fitness challenges, wellness booths, and an energetic, dynamic atmosphere."
                }
                />
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
        </>
    );
};
