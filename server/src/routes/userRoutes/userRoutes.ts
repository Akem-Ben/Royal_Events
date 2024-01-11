import express from "express";
import { registerUser } from "../../controllers/userControllers/userRegister";
import { userLogin } from "../../controllers/userControllers/userLogin";
import { changeProfilePicture } from "../../controllers/userControllers/changeProfilePic";
import { generalAuthoriser } from "../../middleware/authorization";
import { upload } from "../../utilities/upload";
import { changePassword } from "../../controllers/userControllers/userChangePassword";
import { updateProfile } from "../../controllers/userControllers/updateProfile";
import { deleteProfileImage } from "../../controllers/userControllers/deleteProfilePic";
import { resendVerification } from "../../controllers/userControllers/resendVerification";
import { verifyUser } from "../../controllers/userControllers/verifyUser";
import { getUserProfile } from "../../controllers/userControllers/getUserProfile";
import { addAccount } from "../../controllers/accountControllers/createAccount";
import { getUserBankAccount } from "../../controllers/accountControllers/getAccount";
import { userEditAccount } from "../../controllers/accountControllers/editAccount";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", userLogin);
router.patch("/change_profile_picture", generalAuthoriser, upload.single("profilePic"), changeProfilePicture);
router.patch("/change_password", generalAuthoriser, changePassword);
router.patch("/update_profile", generalAuthoriser, upload.single("identity_document"), updateProfile);
router.delete("/delete_profile_image", generalAuthoriser, deleteProfileImage);
router.post("/resend-verification", resendVerification);
router.get("/verify/:token", verifyUser)
router.get("/get_profile", generalAuthoriser, getUserProfile)
router.post("/add_account", generalAuthoriser, addAccount)
router.get("/get_user_account", generalAuthoriser, getUserBankAccount)
router.patch("/edit_account", generalAuthoriser, userEditAccount)
export default router;
