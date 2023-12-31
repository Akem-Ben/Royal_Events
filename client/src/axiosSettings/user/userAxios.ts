import axios from '../../configurations/httpSetup'

export const registerUser = async (body: any) => {
    try {
      const response = await axios.post("/users/signup", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error:any) {
      return error.response;
    }
  };
  export const loginUser = async (body: any) => {
    try {
      const response = await axios.post("users/signin", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err: any) {
      return err.response
    }
  };
  export const resendVerificationLink = async (body:any)=>{
    try{
        const response = await axios.post("users/resend-verification", body)
          return response;
    }catch(err:any){
        return err.response
    }
  }
 export const verifyUser = async (token:string | undefined)=>{
    try{
        const response = await axios.get(`users/verify/${token}`)
        return response
    }catch(err:any){
        return err.response
    }
  }
export const changePassword = async(body:any)=>{
  try{
    const response = await axios.patch("/users/change_password", body)
    return response
  }catch(error:any){
    return error.response
  }
}
export const changeProfilePic = async(picture:any)=>{
  try{
    const response = await axios.patch("/users/change_profile_picture", picture)
  return response.data
  }catch(error:any){
    return error.response
  }
}
export const fetchUserData = async()=>{
  try{
    const response = await axios.get("/users/get_profile")
  return response.data.data
  }catch(error:any){
    return error.response
  }
}
export const updateUserProfile = async(body:any)=>{
  try{
    const response = await axios.patch("/users/update_profile", body)
  return response.data
  }catch(error:any){
    return error.response
  }
}
export const deleteProfileImage = async() => {
  try{
    const response = await axios.delete("/users/delete_profile_image")
  return response.data
  }catch(error:any){
    return error.response
  }
}