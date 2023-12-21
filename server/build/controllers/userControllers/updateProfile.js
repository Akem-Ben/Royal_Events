"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const updateProfile = async (request, response) => {
    try {
        const userId = request.user.id;
        const { firstName, lastName, email, phoneNumber, address, state, zipCode } = request.body;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        if (user) {
            await userModel_1.default.update({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                address: address,
                state: state,
                zip_code: zipCode,
            }, { where: { id: userId } });
            await userModel_1.default.update({
                is_completed_profile: true
            }, { where: { id: userId } });
            const updateUser = await userModel_1.default.findOne({ where: { id: userId } });
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
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
exports.updateProfile = updateProfile;
