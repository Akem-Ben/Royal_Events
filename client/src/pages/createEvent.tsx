import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Input from "../components/Input";
import { Props, Ticket } from "../components/Ticket";
import { IoIosArrowRoundBack } from "react-icons/io";
import React, { Key, useState } from "react";
import Modal from "../components/modal";
import TicketsDropdown, { Tickets } from "../components/dropdownTickets";
import Events from "../components/events";
import { showErrorToast, showToast } from "../utility/toast";
import { createEvent } from "../axiosSettings/events/eventAxios";

export const CreateEventPage = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  //image state
  const [image, setImage] = useState<any | null>(null);

  //for handling ticket type dropdown
  const [selectedTicket, setSelectedTicket] = useState<Tickets | null | any>(
    null
  );
  //for showing and closing the manual input for ticket type
  const [showTicketInput, setShowTicketInput] = useState<boolean>(false);
  //for handling the manually inputted ticket type
  const [customTicketName, setCustomTicketName] = useState<string>("");
  //modal handling
  const [showModal, setShowModal] = useState(false);
  //loading handling
  const [loading, setLoading] = useState(false);
  //responsible for manging the created tickets and displaying them on the page
  const [createdTickets, setCreatedTickets] = useState<Props | any>(null);

  //The other form data
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    event_date: "",
    event_image: {},
    event_time: "",
    location: "",
    no_of_attendees: "",
  });
  //show image
  const [showImage, setShowImage] = useState<any | null>(null);

  const [ticketDetails, setTicketDetails] = useState({
    ticket_type: "",
    ticket_amount: "",
    ticket_quantity: "",
    ticket_description: "",
    ticket_availability: true,
  });

  //To handle the ticket type manually inputed by the user ("other")
  const handleCustomTicketNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setCustomTicketName(e.target.value);
    } catch (err: any) {
      console.log(err);
    }
  };

  //To handle the input field on the fticket modal
  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicketDetails({
      ...ticketDetails,
      [name]: value,
    });
  };

  //Function responsible for populating the tickets when selected
  const handleTicketSelect = (ticket: Tickets) => {
    setSelectedTicket(ticket);
    if (ticket.name === "Other") {
      setShowTicketInput(true);
    } else {
      setShowTicketInput(false);
    }
  };

  //Popping up the ticket modal
  const createTicketModal = async () => {
    try {
      setShowModal(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  //handle the picture-drop event
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      try {
        setImage(droppedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setShowImage(base64String);
        };
        reader.readAsDataURL(droppedFile);
      } catch (error) {
        console.error("Error handling dropped image:", error);
      }
    }
  };

  //function responsible for handling manual selection of image
  const handleImageSelection = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const { files } = e.currentTarget;
    const file = files && files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setShowImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  //close the modal
  const closModal = async () => {
    try {
      setShowModal(false);
      return setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  //handle the events dropdown menu
  const eventsHandler = async (e: any) => {
    try {
      setFormData({ ...formData, type: e.name });
    } catch (error: any) {
      console.log(error);
    }
  };
  //adding tickets button on the modal
  const addTicket = () => {
    setLoading(true);
    if (
      ticketDetails.ticket_amount === "" ||
      ticketDetails.ticket_description === "" ||
      ticketDetails.ticket_quantity === ""
    ) {
      setLoading(false);
      return showErrorToast("All fields must be filled-out");
    }
    if (selectedTicket === null) {
      setLoading(false);
      return showErrorToast("Ticket Type must be indicated");
    }
    const newTicket = {
      ticket_amount: ticketDetails.ticket_amount,
      ticket_type:
        selectedTicket.name === "Other"
          ? customTicketName
          : selectedTicket.name,
      ticket_description: ticketDetails.ticket_description,
      ticket_availability: ticketDetails.ticket_availability,
      ticket_quantity: ticketDetails.ticket_quantity,
    };
    createdTickets === null
      ? setCreatedTickets([newTicket])
      : setCreatedTickets([...createdTickets, newTicket]);
    setShowModal(false);
    setLoading(false);
    setCustomTicketName("");
    setTicketDetails({
      ticket_type: "",
      ticket_availability: true,
      ticket_amount: "",
      ticket_quantity: "",
      ticket_description: "",
    });
  };

  //handling the input change on the main form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //add ticket button for the modal
  const buttons: any = [
    {
      label: `${loading ? "Loading..." : "Add Ticket"}`,
      onClick: addTicket,
      bg: "#27AE60",
      text: "#FFFFFF",
    },
  ];

  //remove image button on the image section
  const removeImage = () => {
    setImage("");
    setShowImage("");
  };

  //handle submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (image === null) {
        setLoading(false);
        return showErrorToast("An event Image must be added");
      }
      if (createdTickets === null) {
        setLoading(false);
        return showErrorToast("An event must have at least one ticket");
      }

      if (
        formData.title === "" ||
        formData.type === "" ||
        formData.description === "" ||
        formData.event_date === "" ||
        formData.event_time === "" ||
        formData.location === "" ||
        formData.no_of_attendees === ""
      ) {
        setLoading(false);
        return showErrorToast("All fields must be completed");
      }
      const newFormData = new FormData();
      newFormData.append("title", formData.title);
      newFormData.append("type", formData.type);
      newFormData.append("description", formData.description);
      newFormData.append("event_date", formData.event_date);
      newFormData.append("event_time", formData.event_time);
      newFormData.append("location", formData.location);
      newFormData.append("no_of_attendees", formData.no_of_attendees);
      newFormData.append("event_image", image);
      newFormData.append("ticket_types", JSON.stringify(createdTickets));

      const response = await createEvent(newFormData);
      if (response.status !== 200) {
        setLoading(false);
        return showErrorToast(response.data.message);
      }
      showToast(response.data.message);
      setFormData({
        title: "",
        type: "",
        event_image: "",
        description: "",
        event_date: "",
        event_time: "",
        location: "",
        no_of_attendees: "",
      });
      setSelectedTicket(null);
      setShowTicketInput(false);
      setShowImage("");
      setCreatedTickets(null);
      return setLoading(false);
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div>
        <div className="fixed left-0 z-20">
          <Sidebar />
        </div>
        <div className="pl-20 fixed top-0 w-full z-10">
          <Navbar
            name={mainUser.first_name}
            image={
              mainUser.profile_picture.length === 0
                ? "/images/event1.png"
                : mainUser.profile_picture
            }
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80%] mt-20">
          <div className="mt-10 mb-4 flex justify-between">
            <div className="w-[289px] h-10 justify-start items-center gap-4 inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="w-6 h-6 relative">
                  {" "}
                  <IoIosArrowRoundBack />{" "}
                </div>
                <div className="mb-2 text-gray-900 text-base font-medium font-['Inter']">
                  Back
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="text-green-500 text-2xl font-medium font-['Inter'] leading-[33.60px]">
                  Create new event
                </div>
                <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
              </div>
            </div>
            <Button
              title={loading ? "Loading..." : "Submit"}
              text={"white"}
              bg={"#27AE60"}
              type={"text"}
              onClick={() => handleSubmit()}
            />
          </div>
          <div className="col-span-full flex justify-center">
            <div
              className={`mt-2 flex text-center items-center justify-center rounded-lg w-full px-6 py-10`}
              style={{ border: "2px dashed grey" }}
            >
              <div
                className="text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {showImage ? (
                  <div>
                    <img
                      src={showImage}
                      alt="Selected or dropped image"
                      className="mx-auto h-40 w-40"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <p className="pl-1">
                        <label
                          htmlFor="file-input"
                          className="text-center text-blue-500 text-base font-semibold leading-normal tracking-tight cursor-pointer"
                        >
                          Change
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageSelection}
                        />
                        <button
                          className="text-red-500 text-base font-semibold leading-normal tracking-tight cursor-pointer ml-2"
                          onClick={removeImage}
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
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
                      <p className="pl-1">
                        Drop Your files here or
                        <label
                          htmlFor="file-input"
                          className="text-center text-blue-500 text-base mb-2 font-semibold leading-normal tracking-tight cursor-pointer ml-2"
                        >
                          browse
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageSelection}
                        />
                      </p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      Maximum size: 50MB
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <form className="md:mt-8 flex flex-col">
            <div className="flex bg-white-200">
              <Input
                title={"EVENT TITLE"}
                placeholder={"Enter your event title"}
                type={"text"}
                onChange={handleInputChange}
                required
                value={formData.title}
                name="title"
              />
              <Input
                title="EVENT LOCATION"
                placeholder="Enter your event location"
                type="text"
                onChange={handleInputChange}
                required
                value={formData.location}
                name="location"
              />
            </div>

            <div className="flex">
              <div className="w-[100%] flex font-normal font-Inter flex-col gap-[10px] mr-[20px] pl-[20px]">
                <label>Event Type</label>
                <Events
                  placeholder="Select Event Type"
                  text=""
                  h="h-[10px]"
                  onChange={eventsHandler}
                  // {(selectedEvent) =>
                  //   setFormData({ ...formData, type: selectedEvent.name })
                  // }
                />
              </div>
              <Input
                title="EXPECTED NUMBER OF ATTENDEES"
                placeholder="Enter your expected number of attendees"
                type="text"
                onChange={handleInputChange}
                required
                value={formData.no_of_attendees}
                name="no_of_attendees"
              />
            </div>
            <div className="flex">
              <Input
                title={"EVENT TIME"}
                placeholder={"8:00pm"}
                type={"text"}
                onChange={handleInputChange}
                required
                value={formData.event_time}
                name="event_time"
              />
              <Input
               title={"EVENT DATE"}
                placeholder={"dd-mm-yyyy"}
                type={"date"}
                onChange={handleInputChange}
                required
                value={formData.event_date}
                name="event_date"
              />
            </div>

            <div className="">
              <Input
                title={"EVENT DESCRIPTION"}
                placeholder={"Enter your event description"}
                type={"text"}
                onChange={handleInputChange}
                required
                value={formData.description}
                name="description"
              />
            </div>
            <div>
              <Button
                title={"Select Ticket Type"}
                text={"white"}
                bg={"#27AE60"}
                type={"text"}
                onClick={createTicketModal}
              />
            </div>
            <div className="overflow-x-scroll overflow-y-none whitespace-nowrap md:mt-8 md:mb-4">
              <div className="flex gap-2">
                {createdTickets !== null &&
                  createdTickets.map(
                    (
                      ticket: {
                        ticket_amount: string;
                        ticket_type: string;
                        ticket_description: string;
                        ticket_availability: string;
                        ticket_quantity: string;
                      },
                      index: Key | null | undefined
                    ) => (
                      <Ticket
                        key={index}
                        ticket_amount={ticket.ticket_amount}
                        ticket_type={ticket.ticket_type}
                        ticket_description={ticket.ticket_description}
                        ticket_availability={ticket.ticket_availability}
                        ticket_quantity={ticket.ticket_quantity}
                      />
                    )
                  )}
              </div>
            </div>

            {showModal && (
              <Modal onClose={closModal} buttons={buttons}>
                <TicketsDropdown onTicketSelect={handleTicketSelect} />
                {showTicketInput && (
                  <Input
                    title={"Ticket Type"}
                    placeholder={"Enter Ticket Type/Name"}
                    name={"ticket_type"}
                    type={"text"}
                    value={customTicketName}
                    required
                    onChange={handleCustomTicketNameChange}
                  />
                )}
                <Input
                  title={"Ticket Cost"}
                  placeholder={"Enter your Cost of Ticket"}
                  type={"number"}
                  name={"ticket_amount"}
                  value={ticketDetails.ticket_amount}
                  required
                  onChange={handleTicketChange}
                />
                <Input
                  title={"Ticket Quantity"}
                  placeholder={"Enter Ticket Quantity"}
                  type={"number"}
                  name={"ticket_quantity"}
                  value={ticketDetails.ticket_quantity}
                  required
                  onChange={handleTicketChange}
                />
                <Input
                  title={"Ticket Description"}
                  placeholder={"Enter Ticket Description"}
                  type={"text"}
                  name={"ticket_description"}
                  value={ticketDetails.ticket_description}
                  required
                  onChange={handleTicketChange}
                />
              </Modal>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
