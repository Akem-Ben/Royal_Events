import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Input from "../components/Input";
import { Ticket } from "../components/Ticket";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const CreateEventPage = () => {
  return (
    <>
      <div>
        <div className="fixed left-0 z-20">
          <Sidebar />
        </div>
        <div className="pl-20 fixed top-0 w-full z-10" >
          <Navbar name={"Shizukani"} image={"Akeno"} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80%] mt-20">
        <div className="mt-10 mb-4 flex justify-between">
            <div className="w-[289px] h-10 justify-start items-center gap-4 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <div className="w-6 h-6 relative"> <IoIosArrowRoundBack /> </div>
                    <div className="mb-2 text-gray-900 text-base font-medium font-['Inter']">Back</div>
                </div>
                <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="text-green-500 text-2xl font-medium font-['Inter'] leading-[33.60px]">Create new event</div>
                    <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
                </div>
            </div>
            <Button title={"Submit"} text={"white"} bg={"green"} type={"text"} />
        </div>
          <div className="col-span-full flex justify-center">
            <div
              className={`mt-2 flex text-center items-center justify-center rounded-lg w-full px-6 py-10`}
              style={{ border: "2px dashed grey" }}
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <p className="pl-1">Drop Your files here o </p>
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <p><Link to="/Path" > r browse </Link></p>
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Maximum size: 50MB
                </p>
              </div>
            </div>
          </div>

          <form className="md:mt-8 flex flex-col">
            <div className="flex bg-white-200 text-green-500">
              <Input
                title={"EVENT TITLE"}
                placeholder={"Enter your event title"}
                type={"text"}
              />
              <Input
                title="EVENT LOCATION"
                placeholder="Enter your event location"
                type="text"
              />
            </div>

            <div className="flex">
              <Input
                title="EVENT TYPE"
                placeholder="Enter your event type"
                type="text"
              />
              <Input
                title="EXPECTED NUMBER OF ATTENDEES"
                placeholder="Enter your expected number of attendees"
                type="text"
              />
            </div>
            <div className="flex">
                <Input
                  title={"EVENT DATE AND TIME"}
                  placeholder={"8:00"}
                  type={"text"}
                />
                <Input
                  title={""}
                  placeholder={"18:00"}
                  type={"text"}
                />
                <Input
                  title={""}
                  placeholder={"12-3-2023"}
                  type={"text"}
                />
            </div>

            <div className="">
              <Input
                title={"EVENT DESCRIPTION"}
                placeholder={"Enter your event description"}
                type={"text"}
              />
            </div>
          </form>

            <div className="md:mt-8 md:mb-4 flex-wrap grid grid-cols-4 gap-3">
                <Ticket price={"Price..."} ticketType={"Ticket Type..."} description={"Text field for a brief description"} availalbility={"type tickets available..."} />
                <Ticket price={"Price..."} ticketType={"Ticket Type..."} description={"Text field for a brief description"} availalbility={"type tickets available..."} />
                <Ticket price={"Price..."} ticketType={"Ticket Type..."} description={"Text field for a brief description"} availalbility={"type tickets available..."} />
                <Ticket price={"Price..."} ticketType={"Ticket Type..."} description={"Text field for a brief description"} availalbility={"type tickets available..."} />
            </div>
        </div>
      </div>
    </>
  );
};