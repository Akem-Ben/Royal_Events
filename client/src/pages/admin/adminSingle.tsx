import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  FaArrowLeft,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
  FaTwitter
} from "react-icons/fa6";
import { TbLockOff } from "react-icons/tb";
import Button from "../../components/Button";
import "../../pages/table.css";

function SingleAdmin() {
  return (
    <div className="w-screen pb-5">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="pl-24">
        <div>
          <Navbar
            name={"John Doe"}
            image={
              "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
            }
          />
        </div>
        <div className="ml-16 mr-16 mt-2">
          <div className="pl-8 my-2">
            <a href="#" className="no-underline text-black">
              <div className="flex">
                <FaArrowLeft className="text-black" />{" "}
                <p className="pl-2">Back</p>
              </div>
            </a>
          </div>
          <div
            className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
            style={{
              backgroundImage: `url("https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg")`,
            }}
          >
            <div className="flex px-20 text-white justify-end py-5">
              <div>
                <a href="facebook.com" className="w-8 h-8">
                  <FaTrash className="text-red-500 w-full h-full p-2 bg-white rounded-full" />
                </a>
                <TbLockOff className="text-red-500 w-full h-full p-2 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex px-20 text-white justify-between pt-35">
              <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
                <h1 className="text-white text-[64px] font-['Inter']">
                  Dream world wide in jakatra
                </h1>
                <div className="text-white text-base font-Inter">
                  DesignHub organized a 3D Modeling Workshop using Blender on
                  16th February at 5 PM. The workshop taught participants the
                  magic of creating stunning 3D models and animations using
                  Blender. It was suitable for both beginners and experienced
                  users. The event was followed by a blender-render competition,
                  which added to the excitement.
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
                  Saturday, March 18 2023, 9.30PM
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
                DesignHub organized a 3D Modeling Workshop using Blender on 16th
                February at 5 PM. The workshop taught participants the magic of
                creating stunning 3D models and animations using Blender. It was
                suitable for both beginners and experienced users. The event was
                followed by a blender-render competition, which added to the
                excitement. DesignHub organized a 3D Modeling Workshop using
                Blender on 16th February at 5 PM. The workshop taught
                participants the magic of creating stunning 3D models and
                animations using Blender. It was suitable for both beginners and
                experienced users. The event was followed by a blender-render
                competition, which added to the excitement.
              </p>
            </div>
            <div className="w-5/12">
              <p className="pt-3 font-medium">Hours</p>
              <p className="font-Inter">
                Weekdays hours:{" "}
                <span className="text-green-500"> 7PM - 8PM</span>
                <br />
                Weekends hours: <span className="text-green-500">7PM- 8PM</span>
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
            <div>
              <div className="flex">
                <img
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                  alt="profile_pic"
                  className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                />
                <h3 className="text-black text-lg pl-2 font-semibold">
                  John Doe
                </h3>
              </div>
              <p className="font-Inter">
                I really appreciate the insights and perspective shared in this
                article. It's definitely given me something to think about and
                has helped me see things from a different angle. Thank you for
                writing and sharing!
              </p>
              <div className="flex justify-start font-Inter">
                <a href="#" className="w-8 h-8">
                  <FaThumbsUp className="" />
                </a>
                <a href="#" className="w-8 h-8">
                  <FaThumbsDown className="" />
                </a>
                <p>5 mins ago</p>
              </div>
            </div>
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

export default SingleAdmin;
