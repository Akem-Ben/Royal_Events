import { Request, Response } from "express";
import { Jwt, JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const updateProfile = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;
    const { firstName, lastName, email, phoneNumber, address, state, zipCode } =
      request.body;

    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await User.update(
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          address: address,
          state: state,
          zip_code: zipCode,
        },
        { where: { id: userId } }
      );
      await User.update({
        is_completed_profile: true
      },
      {where: {id:  userId}})
      const updateUser = await User.findOne({where: {id:userId}})
      return response.status(200).json({
        status: "success",
        message: "Profile updated",
        data: updateUser
      });
    }
    return response.status(400).json({
      status: "error",
      message: "Unable to update profile",
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
