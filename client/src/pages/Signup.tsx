import { Link } from "react-router-dom";
import image from "/images/deca-signup.jpeg";
import Button from "../components/Button";
import Input from "../components/Input";
import Swal from "sweetalert2";
import "../index.css";

function SignUp() {
  const handleSubmit = async () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Registeration successfull",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="w-full h-screen justify-start items-center inline-flex">
      <div
        className={`w-2/5 self-stretch flex flex-col justify-center items-center bg-cover bg-center`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <p className="w-[338px] text-center text-white text-[40px] font-bold font-Inter">
          Welcome back
        </p>
        <p className="text-center text-white font-medium font-Inter">
          Please share your contact details to stay in touch with us.
        </p>
      </div>
      <div className="w-3/5 items-center flex flex-col justify-center">
        <Link to={"/"} className="no-underline">
          <h1 className="text-center">
            <span className="text-black text-2xl font-normal font-Holtwood">
              DECA
            </span>{" "}
            <span className="text-green-500 text-2xl font-normal font-Holtwood leading-[33.60px]">
              EVENTS
            </span>
          </h1>
        </Link>
        <h2 className="text-center text-black text-[32px] font-medium font-Inter mb-8">
          Sign Up to Deca Event
        </h2>

        <form className="flex flex-col w-3/4" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Input
              title={"FIRST NAME"}
              placeholder={"Enter your first name"}
              type={"text"}
            />
            <Input
              title={"LAST NAME"}
              placeholder={"Enter your last name"}
              type={"text"}
            />
          </div>
          <Input
            title={"USERNAME"}
            placeholder={"Enter your username"}
            type={"text"}
          />
          <Input
            title={"EMAIL"}
            placeholder={"Enter your Email"}
            type={"email"}
          />
          <div className="flex gap-3">
            <Input
              title={"PASSWORD"}
              placeholder={"Enter your password"}
              type={"password"}
            />
            <Input
              title={"CONFIRM PASSWORD"}
              placeholder={"Confirm your password"}
              type={"password"}
            />
          </div>
          <p>
            {" "}
            Already have an account? Click{" "}
            <Link to={"/signin"} style={{ textDecoration: "none" }}>
              here
            </Link>{" "}
            to login.
          </p>
          <Button title={"Sign Up"} text={"white"} bg={"#27AE60"} type={"submit"} />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
