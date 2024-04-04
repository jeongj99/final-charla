import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getSearchedUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/search", protectRoute, getSearchedUsersForSidebar);

export default router;