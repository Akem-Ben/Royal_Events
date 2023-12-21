import { Link } from "react-router-dom";
import image from "/images/deca-signin.jpeg";
import Button from "../components/Button";
import Input from "../components/Input";

export const SignIn = () => {
  return (
    <div className="w-full h-screen justify-start items-center inline-flex">
      <div
        className="w-2/5 self-stretch flex flex-col justify-center items-center bg-cover bg-center"
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
        <Link to={'/'} className="no-underline">
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
          Sign In to Deca Event
        </h2>
        <form className="flex flex-col w-3/4">
          <Input
            title={"EMAIL"}
            placeholder={"Enter your email"}
            type={"text"}
          />
          <Input
            title={"PASSWORD"}
            placeholder={"Enter your password"}
            type={"password"}
          />
          <div className="flex justify-between">
            <p>
              {" "}
              Don't have an account? Click{" "}
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                here
              </Link>{" "}
              to register.
            </p>
            <a
              href="#"
              className="underline decoration-green-500 decoration-2 underline-offset-4 text-green-500 float-right mb-8"
            >
              Forgot your password?
            </a>
          </div>
          <Button title={"Sign In"} text={"white"} bg={"#27AE60"} type={"submit"} />
        </form>
      </div>
    </div>
  );
};
