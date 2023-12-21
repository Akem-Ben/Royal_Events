"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const likeEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const user = await userModel_1.default.findOne({
            where: { id: userId },
        });
        if (!user?.isVerified) {
            return res.status(401).json({
                status: "error",
                message: "Only verified users can like an event",
            });
        }
        if (!event.likes.includes(userId)) {
            event.likes.push(userId);
            await event.save();
            res.status(200).json({
                status: "success",
                method: req.method,
                message: "You like this event",
                data: event,
            });
        }
        else {
            res.status(400).json({
                status: "error",
                message: "You have already liked this event",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Unable to like event",
        });
    }
};
exports.likeEvent = likeEvent;
