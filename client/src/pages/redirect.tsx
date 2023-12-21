import Navbar from "../components/Navbar";

export const Redirect = () => {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen w-full items-center">
        <nav className="w-full bg-gray-100 p-4 fixed top-0 z-40">
          <div className="w-10/12 mx-auto flex items-center justify-between">
            <div className="text-center">
              <span className="text-gray-900 text-3xl font-normal font-Holtwood leading-14">
                DECA
              </span>
              <span className="text-green-500 text-3xl font-normal font-Holtwood leading-14">
                EVENTS
              </span>
            </div>
          </div>
          <div>
            <Navbar name={""} image={"src/assets/DecaEvent.svg"} />
          </div>
        </nav>
      </div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg">
          <p>
            Verification Sucessfull <a href="signin">click here to login</a>
          </p>
        </div>
      </div>
    </>
  );
};
