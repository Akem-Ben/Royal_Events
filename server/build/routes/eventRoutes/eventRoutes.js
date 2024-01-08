"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createEvent_1 = require("../../controllers/eventControllers/createEvent");
const getUpcomingEvents_1 = require("../../controllers/eventControllers/getUpcomingEvents");
const getSingleEvent_1 = require("../../controllers/eventControllers/getSingleEvent");
const userEvent_1 = require("../../controllers/eventControllers/userEvent");
const authorization_1 = require("../../middleware/authorization");
const upload_1 = require("../../utilities/upload");
const addComment_1 = require("../../controllers/eventControllers/addComment");
const likeEvent_1 = require("../../controllers/eventControllers/likeEvent");
const dislikeEvent_1 = require("../../controllers/eventControllers/dislikeEvent");
const getComments_1 = require("../../controllers/eventControllers/getComments");
const router = express_1.default.Router();
router.post("/create", upload_1.upload.single("event_image"), authorization_1.generalAuthoriser, createEvent_1.createEvents);
router.get("/upcoming_events", getUpcomingEvents_1.getUpcomingEvents);
router.get("/get-single-event/:id", authorization_1.generalAuthoriser, getSingleEvent_1.getSingleEvent);
router.get("/get-my-events", authorization_1.generalAuthoriser, userEvent_1.userEvent);
router.post("/add-comment/:id", authorization_1.generalAuthoriser, addComment_1.addComment);
router.post("/like/:id", authorization_1.generalAuthoriser, likeEvent_1.likeEvent);
router.post("/dislike/:id", authorization_1.generalAuthoriser, dislikeEvent_1.dislikeEvent);
router.get("/comments/:id", authorization_1.generalAuthoriser, getComments_1.getComments);
exports.default = router;
// generalAuthoriser,
//upload.single("event_image"),
