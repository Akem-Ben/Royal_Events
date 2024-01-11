"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = void 0;
const eventModel_1 = require("../../models/eventModel/eventModel");
const deleteEvent = async (request, response) => {
    try {
        const userId = request.user.id;
        const eventId = request.params.id;
        const event = await eventModel_1.Event.findOne({ where: { id: eventId, owner_id: userId } });
        if (!event) {
            return response.status(404).json({
                status: `error`,
                message: `Event not found`
            });
        }
        await eventModel_1.Event.destroy({ where: { id: eventId, owner_id: userId } });
        const checkDestroy = await eventModel_1.Event.findOne({ where: { id: eventId, owner_id: userId } });
        if (checkDestroy) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to delete Event`
            });
        }
        const allEvents = await eventModel_1.Event.findAll({});
        return response.status(200).json({
            status: `success`,
            message: `Event successfully deleted`,
            allEvents
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        });
    }
};
exports.deleteEvent = deleteEvent;
