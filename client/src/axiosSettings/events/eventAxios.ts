import axios from '../../configurations/httpSetup'

  export const createEvent = async(body:any)=>{
    try {
      const response = await axios.post("events/create", body);
      return response;
    } catch (err: any) {
      return err.response;
    }
}

export const getSingleEvent = async(params:any)=>{
  try{
    const response = await axios.get(`/events/get-single-event/${params}`)
    return response.data
  }catch(error:any){
    return error.response
  }
}

export const makeComments = async(comment:any, params:any)=>{
  try{
    const response = await axios.post(`/events/add-comment/${params}`, comment)
    return response.data
  }catch(error:any){
    return error.response
  }
}

export const upComingEvents = async(params?:any)=>{
  try{
    const response = await axios.get("/events/upcoming_events", {
      params: params,
  })
  return response.data.data
  }catch(error:any){
    return error.response
}
}

export const getEventComments = async(id:any)=>{
  try{
      const response = await axios.get(`/events/comments/${id}`)
        return response.data;
  }catch(err:any){
      return err.response
  }
}

export const getUserEvents = async()=>{
  try{
    const response = await axios.get(`/events/get-my-events`)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const getUserAttendedEvents = async()=>{
  try{
    const response = await axios.get(`/events/attended_events`)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const reportEvent = async(id:any, body:any)=>{
  try{
    const response = await axios.post(`/events/report/${id}`, body)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const organizerDeleteEvent = async(id:any)=>{
  try{
    const response = await axios.delete(`events/delete_event/${id}`)
      return response.data;
}catch(err:any){
    return err.response
}
}