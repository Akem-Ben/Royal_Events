import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const likeEvent = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({
        status: `error`,
        message: `Unable to find event`,
      });
    }

    const user = await User.findOne({
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
    } else {
      res.status(400).json({
        status: "error",
        message: "You have already liked this event",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Unable to like event",
    });
  }
};
