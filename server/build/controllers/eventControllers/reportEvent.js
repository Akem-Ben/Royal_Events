"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportEvent = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const reportEvent = async (request, response) => {
    try {
        const eventId = request.params.id;
        const userId = request.user.id;
        const { report } = request.body;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const eventInfo = await eventModel_1.default.findOne({ where: { id: eventId } });
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
            name_of_reporter: `${user.first_name} ${user.last_name}`,
            email: user.email,
            report: report,
            phone_no: user.phone_number
        };
        let eventArr = [];
        eventArr = eventInfo.reports;
        eventArr.push(eventReport);
        const update = await eventModel_1.default.update({ reports: eventArr }, { where: { id: eventId } });
        if (!update) {
            return response.status(400).json({
                status: `success`,
                message: `Report unsucessful`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Report successfully submitted`,
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.reportEvent = reportEvent;
