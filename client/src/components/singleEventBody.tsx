import { FaEnvelope, FaFacebookF, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa6";

interface Props {
  description: string;
  time: string;
  organizerInfo: string;
}

function SingleEventBody(props: Props) {
  return (
    <div className="flex justify-between pt-5">
      <div className="w-6/12">
        <p className="font-medium">Description</p>
        <p className="font-Inter h-[30%] overflow-y-scroll">{props.description}</p>
        <p className="pt-3 font-medium">Hours</p>
        <p className="font-Inter">
          Time <span className="text-green-500">{props.time}</span>
          <br />
          {/* Weekends hours: <span className="text-green-500">7PM- 8PM</span> */}
        </p>
        <p className="pt-3">Organizer Contact</p>
        <p className="w-[600px]">
          {props.organizerInfo}
        </p>
      </div>
      <div className="w-5/12">
        <p className="font-medium">Event location</p>
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
          alt="map"
          width={480}
          height={260}
        />
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
  );
}

export default SingleEventBody;
