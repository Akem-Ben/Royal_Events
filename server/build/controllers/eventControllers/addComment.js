"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const addComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        const user = await userModel_1.default.findOne({
            where: { id: userId },
        });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Only verified users can comment on an event",
            });
        }
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const commentDetails = {
            user_image: user.profile_picture,
            user_name: user.user_name,
            comment: req.body,
            comment_time: new Date(),
            comment_likes: 0,
            comment_dislikes: 0,
        };
        event.comments.push(commentDetails);
        await event.save();
        res.status(200).json({
            status: "success",
            method: req.method,
            message: "Comment added successfully",
            data: event,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Unable to add comment",
        });
    }
};
exports.addComment = addComment;
