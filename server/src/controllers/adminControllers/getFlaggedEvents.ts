import { Request, Response } from "express";
import { Op } from "sequelize";
import Event from "../../models/eventModel/eventModel";

export const getFlaggedEvents = async (
  request: Request,
  response: Response
) => {
  try {
    const getFlaggedEvents = await Event.findAll({
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
  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({
      status: "error",
      method: request.method,
      message: "Internal Server Error",
    });
  }
};
