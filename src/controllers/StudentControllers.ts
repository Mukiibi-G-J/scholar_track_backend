import {StudentInput, StudentLoginInput} from "../dto";
import { Request, Response, NextFunction, response } from "express";
import { Student } from "../models";
import {GenerateOtp, GeneratePassword, GenerateSalt, ValidatePassword} from "../utils";
import {sendEmail, GenerateSignature} from "../utils";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
export const CreateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentInputs = plainToClass(StudentInput, req.body);
  const validationError = await validate(studentInputs, {
    validationError: { target: true },
  });


  if (validationError.length > 0) {
    const errorMessages = validationError.map((error) => {
      const constraints = error.constraints;
      const property = error.property;
      const message = constraints ? Object.values(constraints).join(", ") : "Validation failed";
      return {property, message};
    });

    return res.status(400).json(errorMessages);
  }
  const { email,  password } =studentInputs;

  const existing_student = await Student.findOne({ email: email });

  if (existing_student != null) {
    return res.json({ message: "A Student with this email already exists" });
  }
  //!generate a salt
  const salt = await GenerateSalt();
  //! generate otp
  const { otp, expiry } = GenerateOtp();
  //!encrypt the password using the salt
  const userPassword = await GeneratePassword(password, salt);

  const createdStudent = await Student.create({
    email: email,
    password: userPassword,
    salt: salt,
    otp: otp,
    otp_expiry: expiry,
  });
  const subject = "Scholar Track Verification";

  await sendEmail(email, subject, otp.toString());

  const signature = await GenerateSignature({
    _id: createdStudent._id,
    email: createdStudent.email,
    verified: createdStudent.verified,

    is_student:true
  });

  return res.status(201).json({ signature, verified: createdStudent.verified, email: createdStudent.email });

};

export const StudentVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { otp } = req.body;
  const student = req.user;
  console.log("student",student)
  if (student) {
    const profile = await Student.findById(student._id)
    if (profile) {
      if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
        profile.verified = true;

        const updatedStudentResponse = await profile.save();

        const signature = await GenerateSignature({
          _id: updatedStudentResponse._id,
          email: updatedStudentResponse.email,
          verified: updatedStudentResponse.verified,
          is_student:true
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
};


export const StudentLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const StudentInputs = plainToClass(StudentLoginInput, req.body);

  const validationError = await validate(StudentInputs, {
    validationError: { target: true },
  });

  if (validationError.length > 0) {
    return res.status(400).json(validationError);
  }

  const { email, password } = StudentInputs;
  const student = await Student.findOne({ email: email });
  if (student) {
    const validation = await ValidatePassword(
        password,
        student.password,
        student.salt
    );

    if (validation) {
      if (student.verified) {
        const signature = await GenerateSignature({
          _id: student._id,
          email: student.email,
          verified: student.verified,
          is_student:true
        });

        return res.status(200).json({
          msg: "login successfully",
          signature: signature,
          email: student.email,
          verified: student.verified,

        });
      } else {
        return res.status(400).json({ msg: "Please Verify your account" });
      }


    }
  }

  return res.json({ msg: "Error With Signup" });
};