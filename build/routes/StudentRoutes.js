"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.StudentsRoutes = router;
router.post("/student_signup", controllers_1.CreateStudent);
router.post('/student_login', controllers_1.StudentLogin);
router.use(middlewares_1.Authenticate);
router.patch("/student_verification", controllers_1.StudentVerify);
//# sourceMappingURL=StudentRoutes.js.map