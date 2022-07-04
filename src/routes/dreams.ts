import express from "express";
import dreamsController from "../controllers/dreams";
import userController from "../controllers/users";
const router = express.Router();

router.get("/dream/list", dreamsController.getDreamList);

router.get("/dream/:id", dreamsController.getDreamDetails);

router.post("/dream", dreamsController.addDreamDetails);

router.put("/dream", dreamsController.updateDreamDetails);

router.post("/users", userController.addUser);

export = router;
