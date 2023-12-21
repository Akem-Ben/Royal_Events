import { Request, Response } from "express";
import { Op } from 'sequelize'
import Event from '../../models/eventModel/eventModel'
import { convertToDDMMYY, convertToISODateString } from "../../helpers/helpers";

// export const getUpcomingEvents = async (request: Request, response: Response) => {
//     try {
//         const presentDay = new Date()

//         let getUpcomingEvents:any = await Event.findAll({ where: { event_start_date: {
//             [Op.gt]: presentDay
//           }, 
//         isBlocked: false
//         } })

//         if (getUpcomingEvents.length === 0) {
//             return response.status(404).json({
//                 message: `No Upcoming Events found`
//             })
//         }
//         getUpcomingEvents = getUpcomingEvents.map((event:any)=>{
//         return{
//             ...event,
//             event_start_date: convertToDDMMYY(event.event_start_date),
//             event_end_date: convertToDDMMYY(event.event_end_date)
//         }
//         })
//         return response.status(200).json({
//             status: 'Success',
//             method: request.method,
//             message: `Upcoming events found successfully`,
//             data: getUpcomingEvents
//         })

//     } catch (error: any) {
//         response.status(400).json({
//             status: 'error',
//             method: request.method,
//             message: 'Error'
//         })
//     }
// }

export const getUpcomingEvents = async (request: Request, response: Response) => {
    try {
      const presentDay = new Date();
  
      const { date, location, eventType } = request.query;

      let main_location:any = location
      let main_event_type:any = eventType
  console.log(request.query)
      const whereClause: any = {
        event_start_date: {
          [Op.gt]: presentDay,
        },
        isBlocked: false,
      };
  
      if (date) {
        // const newDate = convertToISODateString(date as string);
        // console.log('date', newDate)
        whereClause.event_start_date = {
          [Op.gt]: date,
        };
      }
  
      if (location) {
        whereClause.location = main_location.name as string;
      }
  
      if (eventType) {
        whereClause.type = main_event_type.name.toLowerCase() as string;
      }
  
      let getUpcomingEvents: any = await Event.findAll({ where: whereClause });
  
      if (getUpcomingEvents.length === 0) {
        return response.status(404).json({
          message: `No Upcoming Events found`,
        });
      }
  
      // Assuming you're converting dates to a specific format before sending the response
      getUpcomingEvents = getUpcomingEvents.map((event: any) => {
        return {
          ...event,
          event_start_date: convertToDDMMYY(event.event_start_date),
          event_end_date: convertToDDMMYY(event.event_end_date),
        };
      });

      return response.status(200).json({
        status: 'Success',
        method: request.method,
        message: `Upcoming events found successfully`,
        data: getUpcomingEvents,
      });
    } catch (error: any) {
        console.log(error.message)
      response.status(400).json({
        status: 'error',
        method: request.method,
        message: 'Error',
      });
    }
  };