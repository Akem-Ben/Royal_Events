import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const dislikeEvent = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user?.isVerified) {
      return res.status(401).json({
        status: "error",
        message: "Only verified users can dislike an event",
      });
    }
    if (!event) {
      return res.status(404).json({
        status: `error`,
        message: `Unable to find event`,
      });
    }

    if (!event.dislikes.includes(userId)) {
      event.dislikes.push(userId);
      await event.save();

      res.status(200).json({
        status: "success",
        method: req.method,
        message: "You dislike this event",
        data: event,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "You have already disliked this event",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Unable to dislike event",
    });
  }
};
