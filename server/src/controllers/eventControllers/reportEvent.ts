import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";


export const reportEvent = async (request: JwtPayload, response: Response) => {
  try {
    const eventId = request.params.id
    const userId = request.user.id
    const {report} = request.body
    const user:any = await User.findOne({where: {id:userId}}) as unknown as UserAttributes
    const eventInfo:any = await Event.findOne({ where: { id: eventId } }) as unknown as EventAttributes;

    if (!userId) {
      return response.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }
    if (!user) {
      return response.status(404).json({
        status: "error",
        message: "You have to login to report this event",
      });
    }
    if (!eventInfo) {
      return response.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }
    const eventReport = {
        name_of_reporter:`${user.first_name} ${user.last_name}`,
        email:user.email,
        report:report,
        phone_no:user.phone_number
    }

    let eventArr = []
    eventArr = eventInfo.reports
    eventArr.push(eventReport)

    const update = await Event.update({reports: eventArr}, {where: {id:eventId}})
    if(!update){
        return response.status(400).json({
            status: `success`,
            message: `Report unsucessful`,
          });
    } 

    return response.status(200).json({
      status: `success`,
      message: `Report successfully submitted`,
    });

  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};