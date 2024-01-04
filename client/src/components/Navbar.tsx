import { useNavigate } from "react-router-dom";
import notice from "../assets/notifications.svg";
import { showErrorToast, showToast } from "../utility/toast";
import Button from "./Button";

interface Props {
  name: string;
  image: string;
}

function Navbar(props: Props) {
  const navigate = useNavigate();
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);

  const handleLogout = () => {
    console.log('bye')
    localStorage.clear();
    navigate("/");
    return showToast(`Goodbye ${mainUser.first_name}`);
  };
  
  // const handleCreateEvent = () => {
  //   mainUser.isVerified === false
  //     ? showErrorToast("Only users with verified accounts can create events")
  //     : mainUser.is_completed_profile === false
  //     ? showErrorToast(
  //         `please complete your profile before you can create an event`
  //       )
  //     : mainUser.isBlocked === true
  //     ? showErrorToast(
  //         "Your account has been blocked, please contact the admin"
  //       )
  //     : navigate("/create_event");
  // };
  return (
    <div className="w-full h-[72px] pl-[60px] pr-[120px] py-3.5 bg-white shadow-lg flex justify-between items-center">
      <div className="w-1/2">
        <form>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-11 px-6 py-2.5 bg-white rounded-[100px] border font-Inter border-gray-300 justify-start items-center gap-2.5 flex outline-none"
          />
        </form>
      </div>
      <div className="justify-start items-center gap-2 flex ">
        <button>
          <img src={`${notice}`} />
        </button>
        <img
          className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
          src={props.image}
        />
        <div className="text-gray-900 text-base font-normal font-Inter leading-snug tracking-tight">
          {props.name}
        </div>
        {/* <Button
          title={`Create Event`}
          text={"#27AE60"}
          bg={"white"}
          type={""}
          onClick={handleCreateEvent}
        /> */}
        <Button
          title={`Logout`}
          text={"white"}
          bg={"#27AE60"}
          type={""}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Navbar;
