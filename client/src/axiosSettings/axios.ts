import axios from '../configurations/httpSetup'

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
      console.log(err.message);
      return err.response
    }
  };
  export const resendVerificationLink = async (body:any)=>{
    try{
        const response = await axios.post("users/resend-verification", body)
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
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