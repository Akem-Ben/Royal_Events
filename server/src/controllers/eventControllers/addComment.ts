import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { v4 } from "uuid";

export const addComment = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);
    const user = await User.findOne({
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
      comment: req.body.comment,
      comment_time: new Date(),
      comment_likes: 0,
      comment_dislikes: 0,
    };

    event.comments.push(commentDetails);

    const check = await Event.update({comments:event.comments}, {where:{id:eventId}});
    if(check[0]===1){
    const findEvent = await Event.findByPk(eventId)
    return res.status(200).json({
      status: "success",
      method: req.method,
      message: "Comment added successfully",
      data: findEvent,
    });
  }
  return res.status(400).json({
    status: "error",
    method: req.method,
    message: "Unable to add comment",
  });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Unable to add comment",
    });
  }
};
