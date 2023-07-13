import express from "express"
// import {  updateUser } from "../controllers/user.js";
// import { specialFunc } from "../controllers/user.js";
// import { deleteUser } from "../controllers/user.js";
import { getMyProfile } from "../controllers/user.js";
import { register } from "../controllers/user.js";
import { login } from "../controllers/user.js";
import { logout } from "../controllers/user.js";
import {  isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/new",register);

router.post("/login",login);

router.get("/logout",logout);

router.get("/me", isAuthenticated,  getMyProfile);

// router.get("/userid/special",specialFunc);
// router.put("/userid/:id",updateUser);
// router.delete("/userid/:id",deleteUser);


 export default router;