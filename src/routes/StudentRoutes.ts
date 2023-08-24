import express, { Request, Response, NextFunction } from "express";
import {CreateStudent, StudentLogin, StudentVerify} from "../controllers";
import {Authenticate} from "../middlewares";
const router = express.Router();

router.post("/student_signup", CreateStudent);
router.post('/student_login', StudentLogin)
router.use(Authenticate);
router.patch("/student_verification", StudentVerify)



export {router as StudentsRoutes}