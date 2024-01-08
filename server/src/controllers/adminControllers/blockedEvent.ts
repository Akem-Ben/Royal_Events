import { adminAuthoriser } from "../../middleware/authorization";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import { Response, Request, NextFunction } from "express";

export const eventBlocked = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const eventId = request.params.eventId;
    const event = await Event.findByPk(eventId);

    if (!event) {
      return response.status(404).json({ error: "Event not found" });
    }

    if (event.isBlocked) {
      return response.status(400).json({ error: "Event is already blocked" });
    }

    const adminAuthorise = adminAuthoriser;
    if (!adminAuthorise) {
      return response.status(402).json({
        status: "error",
        message: "User cannot block User",
      });
    }
    await event.update({ isBlocked: true });

    return response.status(200).json({
      message: "Event blocked successfully",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: "Internal Server Error",
    });
  }
};
