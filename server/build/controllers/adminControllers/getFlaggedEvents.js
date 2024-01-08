"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlaggedEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const getFlaggedEvents = async (request, response) => {
    try {
        const getFlaggedEvents = await eventModel_1.default.findAll({
            where: {
                reports: {
                    $not: {
                        $eq: [],
                    },
                },
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (getFlaggedEvents.length === 0) {
            return response.status(404).json({
                message: `No Flagged Events`,
            });
        }
        return response.status(200).json({
            status: "Success",
            method: request.method,
            message: `Events found successfully`,
            data: getFlaggedEvents,
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: "error",
            method: request.method,
            message: "Internal Server Error",
        });
    }
};
exports.getFlaggedEvents = getFlaggedEvents;
