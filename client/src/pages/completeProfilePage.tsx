import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { changeProfilePic, deleteProfileImage, fetchUserData, updateUserProfile } from "../axiosSettings/user/userAxios";
import Modal from "../components/modal";

const ProfilePage = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  const [loading, setLoading] = useState(false)
  const [initialUser, setInitialUser] = useState<any>({})
  const [showSnappedImageModal, setShowSnappedImageModal] = useState<any>(null);
  const [identityImage, setIdentityImage] = useState<any>("")

  const [snappedImage, setSnappedImage] = useState("")
  const [newUser, setNewUser] = useState(initialUser)

  const [takePictureLoading, setTakePictureLoading] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [savePictureLoading, setSavePictureLoading] = useState(false)

  const handleInputChange = async(e:any) => {
    e.preventDefault()
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    })

  }

  const handleIdentityDocumentChange = async(e:any) => {
    e.preventDefault()
    const { files } = e.currentTarget;
    const file = files && files[0]
    if(file){
      setIdentityImage(file)
    }
  }
  const fetchUserDataz = async() => {
    try{
      const response = await fetchUserData()
      return setInitialUser(response)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  useEffect(()=> {
    fetchUserDataz()
  },[])

  const updateProfile = async(e:any) => {
    try{
      e.preventDefault()
      setLoading(true)

      const myForm = new FormData()
      myForm.append("identity_document", identityImage)
      myForm.append("phone_number", newUser.phone_number)
      myForm.append("address", newUser.address)
      myForm.append("state", newUser.state)
      myForm.append("zip_code", newUser.zip_code)

      const response = await updateUserProfile(myForm)
      if(response.status !== 'success'){
        setLoading(false)
        return showErrorToast(response.message)
      }
      localStorage.setItem("user", JSON.stringify(response.data))
      showSuccessToast(response.message)
      setNewUser({
        phone_number: "",
        address: "",
        state: "",
        zip_code: ""
      })
      setIdentityImage("")
      fetchUserDataz()
      return setLoading(false)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }

  
  const handleProfilePictureModal = async(e:any)=>{
    try{
      e.preventDefault()
      setProfileImageLoading(true)
      setShowModal(true)
      setProfileImageLoading(false)
      return openCamera()
    //   const { files } = e.currentTarget;
    // const file = files && files[0]
    // if(file){
    //   const newImage = new FormData()
    //   newImage.append("profilePic", file)
    //  const response = await changeProfilePicture(newImage)
    //  showSuccessToast(response.message)
    //  localStorage.setItem("user", JSON.stringify(response.data))
    //  fetchUserData()
    //  return setProfileImageLoading(false)
    // }else{
    //   setProfileImageLoading(false)
    //   return showErrorToast("Image Upload Failed, Try Again Later")
    // }
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  const deleteAvatar = async()=>{
    try{
      setDeleteLoading(true)
      const response = await deleteProfileImage()
      if(response.status !== 'success'){
        setDeleteLoading(false)
        return showErrorToast(response.message)
      }
      showSuccessToast(response.message)
      localStorage.setItem("user", JSON.stringify(response.data))
      fetchUserDataz()
      return setDeleteLoading(false)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }

  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const [imageToSave, setImageToSave] = useState<any>(undefined)
  const openCamera = async () => {
    try {
      const stream:any = await navigator.mediaDevices.getUserMedia({ video: true });
      return setMediaStream(stream);
    } catch (error) {
      showErrorToast('Error accessing camera')
      console.error('Error accessing camera:', error);
    }
  };

  const closeCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track:any) => track.stop());
      return setMediaStream(null);
    }
  };

  const closeModal = async()=>{
    closeCamera()
    return setShowModal(false)
  }

  const takePicture = async()=>{
    try{
      setTakePictureLoading(true)
      if (mediaStream) {
        const video = document.querySelector('video');
      if (video) {
        const canvas = document.createElement('canvas');
        // Set the canvas dimensions to match the video frame
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');

        //Prepare the image to be saved if the user chooses to save

        // Draw the current frame from the video onto the canvas
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert the canvas content to a data URL representing the captured image
          const imageDataURL = canvas.toDataURL('image/jpeg');

          //set up image to be saved in case the user decides to save the image
          canvas.toBlob((blob) => {
            if (blob) {
              // Create a File object from the Blob (optional: specify a filename)
              const file = new File([imageDataURL], 'captured_image.jpeg', { type: 'image/jpeg' });
              setImageToSave(file)
            }else {
              console.log('Blob conversion failed.');
            }
          }, 'image/jpeg')

          // Now you have the image data URL, you can use or display it
          // For example, you might want to display it in an image element
          const imageElement = document.createElement('img');
          imageElement.src = imageDataURL;
          setSnappedImage(imageDataURL) // Add the image element to the body
          closeModal()
          setShowSnappedImageModal(true)
          return setTakePictureLoading(false)
        }
      }
    } else {
      console.error('Media stream not available.');
    }

    }catch (error: any) {
     console.log(error)
    }
  }

  const buttons:any = [
    {
      label: `${takePictureLoading ? "Loading..." : "Take picture"}`,
      onClick: () => takePicture(),
      bg: '#27AE60',
      text: '#FFFFFF',
    },
  ]
const retakePicture = async()=>{
  try{
    setShowSnappedImageModal(false)
    setShowModal(true)
    return openCamera()
  }catch (error: any) {
    console.log(error)
  }
}

const savePicture = async()=>{
  try{
    setSavePictureLoading(true)
    const image = imageToSave
    const newImage = new FormData()
    newImage.append("profilePic", image)
    const response = await changeProfilePic(newImage)

     if(response.status !== 'sucess'){
      showErrorToast(response.data.message)
     }
     showSuccessToast(response.message)
     localStorage.setItem("user", JSON.stringify(response.data))
     setSavePictureLoading(false)
     setLoading(false)
     setTakePictureLoading(false)
     setShowSnappedImageModal(false)
     setShowModal(false)
     return fetchUserData()
  }catch (error: any) {
    if (error.response) {
      return showErrorToast(error.response.data.message);
    } else if (error.request) {
      return showErrorToast('Network Error. Please try again later.');
    } else {
      return showErrorToast('Error occurred. Please try again.');
    }
  }
}

const closeSnappedModal = async()=>{
  try{
    setImageToSave(false)
    setSavePictureLoading(false)
    return setShowSnappedImageModal(false)
  }catch(err:any){
    console.log(err)
  }
}
  const snappedButtons:any = [
    {
      label: "Retake Picture",
      onClick: ()=> retakePicture(),
      bg: '#27AE60',
      text: '#FFFFFF',
    },
    {
      label: `${savePictureLoading ? "Loading..." : "Save Picture"}`,
      onClick: ()=> savePicture(),
      bg: '#27AE60',
      text: '#FFFFFF',
    }
  ]
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

        <div className="justify-start items-start gap-4 sm:gap-[104px] inline-flex">
          <form className="w-full sm:w-[578px] flex-col justify-center items-center inline-flex" onSubmit={updateProfile}>
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
              title={"USERNAME"}
              placeholder={initialUser.user_name}
              type={"text"}
              disabled
            />
            <Input
              title={"PHONE NUMBER"}
              placeholder={initialUser.phone_number?.length === 0 ? "Enter your phone number" : initialUser.phone_number}
              type={"number"}
              required
              value={newUser.phone_number}
              name={"phone_number"}
              onChange={handleInputChange}
            />
            <Input
              title={"ADDRESS"}
              placeholder={initialUser.address?.length === 0 ? "Enter your phone address" : initialUser.address}
              type={"text"}
              required
              value={newUser.address}
              name={"address"}
              onChange={handleInputChange}
            />
            <Input
              title={"STATE"}
              placeholder={initialUser.state?.length === 0 ? "Enter your state of residence" : initialUser.state}
              type={"text"}
              required
              value={newUser.state}
              name={"state"}
              onChange={handleInputChange}
            />
            <Input
              title={"ZIP CODE"}
              placeholder={initialUser.zip_code?.length === 0 ? "Enter your zip code" : initialUser.zip_code}
              type={"text"}
              required
              value={newUser.zip_code}
              name={"zip_code"}
              onChange={handleInputChange}
            />
            <Input
              title={"IDENTITY DOCUMENT"}
              placeholder={""}
              type={"file"}
              required
              value={identityImage.identity_document}
              name={"identity_document"}
              onChange={handleIdentityDocumentChange}
              disabled={initialUser.identity_document?.length !== 0}
            />
          <Button
          title={loading ? "Loading..." : "Save Changes"}
          text={"white"}
          bg={"#4caf50"}
          type={"submit"}
        />
            </form>
          <div className="flex-col justify-center items-center gap-4 flex mt-4 sm:mt-8">
              <div className="w-[110%] flex justify-center h-[70%]">
                <img
                  alt="not found"
                  style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "210px",
                  }}
                  src={mainUser.profile_picture.length === 0
                    ? "/images/event1.png"
                    : mainUser.profile_picture}
                />
              </div>
            <div className="flex cursor-pointer p-[5px] border border-green-500">
              {/* <img src="/images/Camera.png" alt="" />
              <input
                 type="file"
                 name="profile_pic"
                 id="profile_pic"
                 style={{
                   display: "none",
                 }}
                className="flex-1"
                value={selectedImage?.profile_picture}
                onChange={handleProfilePicture}
              /> */}
              <button onClick={handleProfilePictureModal}
                // htmlFor="profile_pic"
                className="custom-file-input-label cursor-pointer"
              >
                {profileImageLoading ? "Loading..." : "Change Avatar"}
              </button>
            </div>
            <button
              className="text-rose-500 text-base font-medium font-['Montserrat']"
              onClick={deleteAvatar}
            >
              {deleteLoading ? "Loading..." : "Delete Avatar"}
            </button>
          </div>
        </div>
        {showModal && (
        <Modal onClose={() => closeModal()} buttons={buttons}>
          <div className="flex justify-center items-center mb-[10px]">
          {mediaStream ? (
            <video
              autoPlay
              playsInline
              muted
              className="bg-gray-500"
              ref={(videoEl) => {
                if (videoEl) {
                  videoEl.srcObject = mediaStream;
                }
              }}
              style={{ width: "80%", height: '60%' }}
            />
          ):(<p>Camera Loading...</p>)}
          </div>
        </Modal>
      )}
        {showSnappedImageModal && (
        <Modal onClose={() => closeSnappedModal()} buttons={snappedButtons}>
          <div className="flex justify-center items-center mb-[10px]">
        <img src={snappedImage}/>
          </div>
        </Modal>
      )}
      </div>
    </>
  );
};

export default ProfilePage;

