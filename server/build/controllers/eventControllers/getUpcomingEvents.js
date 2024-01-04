"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcomingEvents = void 0;
const sequelize_1 = require("sequelize");
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const helpers_1 = require("../../helpers/helpers");
const getUpcomingEvents = async (request, response) => {
    try {
        const presentDay = new Date();
        const { date, location, eventType } = request.query;
        // let pre = new Date()
        // console.log('pre', pre)
        // let me = new Date(`${pre}`)
        // console.log('me', me)
        // // new Date('2023-12-28T20:19:07.255Z')
        // let re = me.setUTCHours(0, 0, 0, 0)
        // console.log('re', new Date(re))
        let dateOne = new Date(`${date}`);
        let dateUTC = dateOne.setUTCHours(0, 0, 0, 0);
        let finalDate = new Date(dateUTC);
        let main_location = location;
        let main_event_type = eventType;
        const whereClause = {
            event_date: {
                [sequelize_1.Op.gt]: presentDay,
            },
            isBlocked: false,
        };
        if (date) {
            // const newDate = convertToISODateString(date as string);
            // console.log('date', newDate)
            whereClause.event_date = finalDate;
        }
        if (location) {
            whereClause.location = main_location.name;
        }
        if (eventType) {
            whereClause.type = main_event_type.name;
        }
        let getUpcomingEvents = await eventModel_1.default.findAll({ where: whereClause });
        if (getUpcomingEvents.length === 0) {
            return response.status(404).json({
                message: `No Upcoming Events found`,
            });
        }
        // Assuming you're converting dates to a specific format before sending the response
        getUpcomingEvents = getUpcomingEvents.map((event) => {
            return {
                ...event,
                event_date: (0, helpers_1.convertToDDMMYY)(event.event_date),
                // event_end_date: convertToDDMMYY(event.event_end_date),
            };
        });
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Upcoming events found successfully`,
            data: getUpcomingEvents,
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: 'Error',
        });
    }
};
exports.getUpcomingEvents = getUpcomingEvents;
