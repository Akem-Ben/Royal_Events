import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Card from '../components/Cards';
import Events from "../components/events";

export const HostedEventPage = () => {
    const user:any = localStorage.getItem("user")
    const newUser = JSON.parse(user)
    return (
        <>
        <div className="fixed left-0">
            <Sidebar />
        </div>
        <div className="pl-20 pb-10">
        <Navbar name={newUser.first_name} image={newUser.profile_picture.length === 0 ? "/images/event1.png" : newUser.profile_picture} />
        </div>
        <div className="flex justify-center">
            <div className="w-[80%]">
                <Tabs className="flex flex-col">
                    <div className="flex justify-between">
                        <TabList>
                            <Tab>Hosted Events</Tab>
                            <Tab>Upcoming Events</Tab>
                            <Tab>Attended Events</Tab>
                        </TabList>
                        <div className="h-10 flex flex-col md:flex-row gap-5 ">
                            <Events
                                    placeholder={"Any category"}
                                    text={"text-grey-500 text-xs"}
                                    h={""} onChange={function (selectedEvent: any): void {
                                        throw new Error("Function not implemented.");
                                    } }                            />
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
            
                    <TabPanel>
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
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
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
                            <Card
                                image={"/images/event4.jpeg"}
                                date={"25 of Dec, 2023"}
                                ticketsNo={0}
                                title={"Neon Groove"}
                                description={
                                    "Infuse vibrant neon colors, glow-in-the-dark elements, and energetic music for a lively and immersive experience."
                                }
                            />
                            <Card
                                image={"/images/event5.jpeg"}
                                date={"25 of Dec, 2023"}
                                ticketsNo={0}
                                title={"Expression Unveiled"}
                                description={
                                    "Celebrate diverse forms of artistic expression with unique installations, interactive exhibits, and expressive artwork."
                                }
                            />
                            <Card
                                image={"/images/event6.jpeg"}
                                date={"25 of Dec, 2023"}
                                ticketsNo={0}
                                title={"Couture Elegance"}
                                description={
                                    "Showcase high-end fashion in a sophisticated setting with glamorous runway designs and chic décor."
                                }
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
                            <Card
                                image={"/images/event3.jpeg"}
                                date={"25 of Dec, 2023"}
                                ticketsNo={0}
                                title={"Neon Groove"}
                                description={
                                    "Infuse vibrant neon colors, glow-in-the-dark elements, and energetic music for a lively and immersive experience."
                                }
                            />
                            <Card
                                image={"/images/event1.jpeg"}
                                date={"25 of Dec, 2023"}
                                ticketsNo={0}
                                title={"Expression Unveiled"}
                                description={
                                    "Celebrate diverse forms of artistic expression with unique installations, interactive exhibits, and expressive artwork."
                                }
                            />
                            <Card
                                image={"/images/event5.jpeg"}
                                date={"25 of Dec, 2023"}
                                ticketsNo={0}
                                title={"Couture Elegance"}
                                description={
                                    "Showcase high-end fashion in a sophisticated setting with glamorous runway designs and chic décor."
                                }
                            />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
        </>
    )
}