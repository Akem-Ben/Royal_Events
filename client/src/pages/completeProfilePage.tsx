import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { changeProfilePic, deleteProfileImage, fetchUserData, updateUserProfile } from "../axiosSettings/axios";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [initialUser, setInitialUser] = useState<any>({})
  const [getUser, setGetUser] = useState<any>(initialUser)
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [profilePic, setProfilePic] = useState<any>("");
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchData = async()=>{
    try {

      const response:any = await fetchUserData()
      return setInitialUser(response)
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      }
      if (error.request) {
        return showErrorToast("Network Error");
      }
      if (error.message) {
        return showErrorToast(error.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleInputChange = async(e:any)=>{
    e.preventDefault()
    const { name, value } = e.target;
    console.log(e.target.value)
    setGetUser({
      ...getUser,
      [name]: value
    })
  }

  const handleFileChange = (e:any) => {
    e.preventDefault();
    const { files } = e.currentTarget;
    const file = files && files[0];
    if (file) { 
      setSelectedImage(file)
    }
  };

  const handleProfileImageChange = async(e:any) => {
    try{
      e.preventDefault()
      setImageLoading(true)
      const { files } = e.currentTarget;
    const file = files && files[0];
    if (file) { 
      setProfilePic(file)
      const newImageData = new FormData();
      newImageData.append("profilePic", file);
      const response = await changeProfilePic(newImageData)
      showSuccessToast(response.message)
      localStorage.setItem("user", JSON.stringify(response.data))
      fetchData()
      return setImageLoading(false)
    }else{
      setImageLoading(false)
      return showErrorToast("Image upload Failed")
    }
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      }
      if (error.request) {
        return showErrorToast("Network Error");
      }
      if (error.message) {
        return showErrorToast(error.message);
      }
    }
  }

  const deleteImage = async (e:any) => {
    try{
      setDeleteLoading(true)
      const response = await deleteProfileImage()
      if(response.status !== 'success'){
        setDeleteLoading(false)
        return showErrorToast(response.message)
      }
      showSuccessToast(response.message)
      localStorage.setItem("user", JSON.stringify(response.data))
      fetchData()
      setDeleteLoading(false)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      }
      if (error.request) {
        return showErrorToast("Network Error");
      }
      if (error.message) {
        return showErrorToast(error.message);
      }
    }
  }
  const updateProfile = async(e:any)=>{
    try{
      e.preventDefault()
      setLoading(true)
      const newFormData = new FormData();
      newFormData.append("phone_number", getUser.phone_number);
      newFormData.append("address", getUser.address);
      newFormData.append("state", getUser.state);
      newFormData.append("zip_code", getUser.zip_code);
      newFormData.append("identity_document", selectedImage);
      
      const response = await updateUserProfile(newFormData)
      if(response.status !== 'success'){
        setLoading(false)
        return showErrorToast(response.message)
      }
      showSuccessToast(response.message)

      setGetUser({
        phone_number: "",
        address: "",
        state: "",
        zip_code: "",
      })
      setSelectedImage("")
      return setLoading(false)

    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      }
      if (error.request) {
        return showErrorToast("Network Error");
      }
      if (error.message) {
        return showErrorToast(error.message);
      }
    }
  }



  return (
    <>
      <div className="fixed left-0">
        <Sidebar />
      </div>
      <div className="pl-4 sm:pl-20 pb-10">
        <Navbar name={mainUser.first_name} image={mainUser.profile_picture.length === 0
              ? "/images/event1.png"
              : mainUser.profile_picture} />
      </div>
      <div className="w-full sm:w-[80%] h-auto sm:h-[678px] flex-col md:px-32 md:ml-32 justify-start items-start gap-4 inline-flex px-4 sm:px-32">
        <div className="w-full sm:w-[854px] justify-start items-start gap-2.5 inline-flex">
          <div className="grow shrink basis-0 h-11 px-4 py-3 bg-green-500 rounded-md justify-center items-center gap-2 flex">
            <div className="justify-center items-center gap-2 flex">
              <img
                className="w-6 h-6"
                src="../images/profileIcon.png"
                alt="Profile Icon"
              />
              <div className="text-gray-100 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                Profile
              </div>
            </div>
          </div>
          <Link
            to={"/changepass"}
            className="grow shrink basis-0 rounded-md flex-col justify-center items-center inline-flex no-underline"
          >
            <div className="px-4 py-3 justify-start items-center gap-2 inline-flex">
              <div className="justify-center items-center gap-2 flex">
                <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                  Password
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="pl-[0px] justify-start items-start gap-4 sm:gap-[104px] inline-flex">
          <div className="w-full sm:w-[578px] flex-col inline-flex">
          <form className="w-[90%]" onSubmit={updateProfile}>
          <Input
              title={"USERNAME"}
              placeholder={initialUser.user_name}
              type={"text"}
              required
              disabled
            />
            <Input
              title={"FULL NAME"}
              placeholder={`${initialUser.first_name} ${initialUser.last_name}`}
              type={"text"}
              disabled
            />
            <Input
              title={"EMAIL"}
              placeholder={initialUser.email}
              type={"email"}
              disabled
            />
            <Input
              title={"PHONE NUMBER"}
              placeholder={initialUser.phone_number?.length === 0 ? "Enter your phone number initial" : initialUser.phone_number}
              type={"number"}
              required
              value={getUser.phone_number}
              // disabled={initialUser.phone_number?.length !== 0}
              onChange={handleInputChange}
              name={"phone_number"}
            />
            <Input
              title={"ADDRESS"}
              placeholder={initialUser.address?.length === 0 ? "Enter your address" : initialUser.address}
              type={"text"}
              required
              value={getUser.address}
              // disabled={initialUser.address?.length !== 0}
              onChange={handleInputChange}
              name={"address"}
            />
            <Input
              title={"STATE"}
              placeholder={initialUser.state?.length === 0 ? "Enter your state" :  initialUser.state}
              type={"text"}
              value={getUser.state}
              onChange={handleInputChange}
              required
              name={"state"}
              // disabled={initialUser.state?.length !== 0}
            />
            <Input
              title={"ZIP CODE"}
              value={getUser.zip_code}
              placeholder={initialUser.zip_code?.length === 0 ? "Enter your zip code" : initialUser.zip_code}
              type={"text"}
              onChange={handleInputChange}
              required
              name={"zip_code"}
              // disabled={initialUser.address?.length !== 0}
            />
            <Input
              title={"IDENTITY DOCUMENT (NIN/DRIVERS LICENSE/INTERNATIONAL PASSPORT)"}
              placeholder={initialUser.identity_document?.length === 0 ? "Upload your NIN/DRIVERS LICENSE/INTERNATIONAL PASSPORT" : "DOCUMENT ALREADY SUBMITTED"}
              type={"file"}
              required
              onChange={handleFileChange}
              name={"identity_document"}
              value={selectedImage.identity_document}
              disabled = {initialUser.identity_document?.length !== 0}
            />
            <br />
             <Button
          title={loading ? "Loading..." : "SAVE CHANGES"}
          text={"white"}
          bg={"#4caf50"}
          type={"submit"}
        />
          </form>
          </div>
          <div className="flex-col justify-center items-center gap-4 flex mt-4 sm:mt-8">
              <div className="w-[110%] flex justify-center h-[70%]">
                <img
                  alt="not found"
                  style={{
                    borderRadius: "50%",
                    height: "100px",
                    width: "80%",
                  }}
                  src={mainUser.profile_picture.length === 0
                    ? "/images/event1.png"
                    : mainUser.profile_picture}
                />
              </div>
            <div className="flex cursor-pointer p-[5px] border border-orange-500">
              <img src="/images/Camera.png" alt="" />
              <input
                type="file"
                name="profile_pic"
                id="profile_pic"
                style={{
                  display: "none",
                }}
                className="flex-1"
                onChange={handleProfileImageChange}
                required
                value={profilePic.profile_pic}
              />
              <label
                htmlFor="profile_pic"
                className="custom-file-input-label cursor-pointer"
              >
                {imageLoading ? "Loading..." : "Change Avatar"}
              </label>
            </div>
            <button
              className="text-rose-500 text-base font-medium font-['Montserrat']"
              onClick={deleteImage}
            >
              {deleteLoading ? "Loading..." : "Delete Avatar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
