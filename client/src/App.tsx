import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { LandingPage } from "./pages/Landingpage";
import ProfilePage from "./pages/completeProfilePage";
import TicketHistory from "./pages/TicketHistory";
import { Redirect } from "./pages/redirect";
import { UpcomingEvents } from "./pages/upcomingevents";
import SingleEvent from "./pages/singleEvent";
import SingleEventAdmin from "./pages/singleEventAdmin";
import Reg4Event from "./pages/registerForEvent";
import { ChangePassword } from "./pages/changePassword";
import { CreateEventPage } from "./pages/createEvent";
import { HostedEventPage } from "./pages/hostedEvents";

function App() {
  return (
    <>
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/create_event" element={<CreateEventPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/redirect/:token" element={<Redirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/upcomingevents" element={<UpcomingEvents />} />
          <Route path="/single-event/:eventId" element={<SingleEvent />} />
          <Route path="/hostedevent" element={<HostedEventPage />} />
          <Route path="/admin/single-event/:eventId" element={<SingleEventAdmin />} />
          <Route path="/reg4event" element={<Reg4Event />} />
          <Route path="/changepass" element={<ChangePassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ticketHistory" element={<TicketHistory />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}
// :eventId
export default App;
