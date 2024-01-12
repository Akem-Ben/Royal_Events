import express from "express";
import { adminAuthoriser } from "../../middleware/authorization";
import { deleteEvents } from "../../controllers/adminControllers/deleteEvent";
import { eventBlocked } from "../../controllers/adminControllers/blockedEvent";
import { eventUnblocked } from "../../controllers/adminControllers/unblockEvent";
import { getUserComments } from "../../controllers/adminControllers/getComments";

const router = express.Router();

router.delete("/deleteEvent", adminAuthoriser , deleteEvents )
router.post("/blockedEvent", adminAuthoriser , eventBlocked )
router.post("/unblockEvent", adminAuthoriser , eventUnblocked )
router.get("/getComments", getUserComments )


export default router;
