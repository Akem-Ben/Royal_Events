import express from "express";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { userLogin } from "../../controllers/userControllers/userLogin";
import { changeProfilePicture } from "../../controllers/userControllers/changeProfilePic";
import { generalAuthoriser } from "../../middleware/authorization";
import { upload } from "../../utilities/upload";
import { changePassword } from "../../controllers/userControllers/userChangePassword";
import { updateProfile } from "../../controllers/userControllers/updateProfile";
import { deleteProfileImage } from "../../controllers/userControllers/deleteProfilePic";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", userLogin);
router.patch(
  "/change_profile_picture",
  generalAuthoriser,
  upload.single("profilePic"),
  changeProfilePicture
);
router.patch("/change_password", generalAuthoriser, changePassword);
router.patch("/update_profile", generalAuthoriser, updateProfile);
router.delete("/delete_profile_image", generalAuthoriser, deleteProfileImage);

export default router;
