"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentLogin = exports.StudentVerify = exports.CreateStudent = void 0;
const dto_1 = require("../dto");
const models_1 = require("../models");
const utils_1 = require("../utils");
const utils_2 = require("../utils");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const CreateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentInputs = (0, class_transformer_1.plainToClass)(dto_1.StudentInput, req.body);
    const validationError = yield (0, class_validator_1.validate)(studentInputs, {
        validationError: { target: true },
    });
    if (validationError.length > 0) {
        const errorMessages = validationError.map((error) => {
            const constraints = error.constraints;
            const property = error.property;
            const message = constraints ? Object.values(constraints).join(", ") : "Validation failed";
            return { property, message };
        });
        return res.status(400).json(errorMessages);
    }
    const { email, password } = studentInputs;
    const existing_student = yield models_1.Student.findOne({ email: email });
    if (existing_student != null) {
        return res.json({ message: "A Student with this email already exists" });
    }
    //!generate a salt
    const salt = yield (0, utils_1.GenerateSalt)();
    //! generate otp
    const { otp, expiry } = (0, utils_1.GenerateOtp)();
    //!encrypt the password using the salt
    const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
    const createdStudent = yield models_1.Student.create({
        email: email,
        password: userPassword,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
    });
    const subject = "Scholar Track Verification";
    yield (0, utils_2.sendEmail)(email, subject, otp.toString());
    const signature = yield (0, utils_2.GenerateSignature)({
        _id: createdStudent._id,
        email: createdStudent.email,
        verified: createdStudent.verified,
        is_student: true
    });
    return res.status(201).json({ signature, verified: createdStudent.verified, email: createdStudent.email });
});
exports.CreateStudent = CreateStudent;
const StudentVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const student = req.user;
    console.log("student", student);
    if (student) {
        const profile = yield models_1.Student.findById(student._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updatedStudentResponse = yield profile.save();
                const signature = yield (0, utils_2.GenerateSignature)({
                    _id: updatedStudentResponse._id,
                    email: updatedStudentResponse.email,
                    verified: updatedStudentResponse.verified,
                    is_student: true
                });
                return res.status(200).json({
                    signature,
                    email: updatedStudentResponse.email,
                    verified: updatedStudentResponse.verified,
                    firstName: updatedStudentResponse.firstName,
                    lastName: updatedStudentResponse.lastName,
                });
            }
        }
    }
    return res.status(400).json({ msg: "Unable to verify Student" });
});
exports.StudentVerify = StudentVerify;
const StudentLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const StudentInputs = (0, class_transformer_1.plainToClass)(dto_1.StudentLoginInput, req.body);
    const validationError = yield (0, class_validator_1.validate)(StudentInputs, {
        validationError: { target: true },
    });
    if (validationError.length > 0) {
        return res.status(400).json(validationError);
    }
    const { email, password } = StudentInputs;
    const student = yield models_1.Student.findOne({ email: email });
    if (student) {
        const validation = yield (0, utils_1.ValidatePassword)(password, student.password, student.salt);
        if (validation) {
            if (student.verified) {
                const signature = yield (0, utils_2.GenerateSignature)({
                    _id: student._id,
                    email: student.email,
                    verified: student.verified,
                    is_student: true
                });
                return res.status(200).json({
                    msg: "login successfully",
                    signature: signature,
                    email: student.email,
                    verified: student.verified,
                });
            }
            else {
                return res.status(400).json({ msg: "Please Verify your account" });
            }
        }
    }
    return res.json({ msg: "Error With Signup" });
});
exports.StudentLogin = StudentLogin;
//# sourceMappingURL=StudentControllers.js.map