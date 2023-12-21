import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { LandingPage } from "./pages/Landingpage";
import { Redirect } from "./pages/redirect";
import { Modal } from "./components/modal";
import { UpcomingEvents } from "./pages/upcomingevents";

function App() {
  return (
    <>
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/upcomingevents" element={<UpcomingEvents />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
