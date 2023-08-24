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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "kalideveloper865@gmail.com",
        pass: "uayoaemfbnbxsqpb",
    },
});
/// create afucntion to send email
const emailTemplate = `
  <html>
    <head>
      <style>
        /* CSS styles */
      </style>
      <title></title>
    </head>
    <body>
    <img src="https://res.cloudinary.com/dbyhl9rtv/image/upload/v1692837082/logo_1_fg2zmc.png" alt="Company Logo">
      <h1>Your OTP Code is {{ otpCode }}</h1>
      <p>Please use the code above to verify your account.</p>
      <p>Thank you for using our service!</p>
    </body>
  </html>
`;
const sendEmail = (email, subject, otpCode) => __awaiter(void 0, void 0, void 0, function* () {
    const replaceVariables = (template, variables) => {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{ ${key} }}`, "g");
            result = result.replace(regex, value);
        }
        return result;
    };
    const emailHtml = replaceVariables(emailTemplate, { otpCode });
    const mailOptions = {
        from: "kalideveloper865@gmail.com",
        to: email,
        subject: subject,
        html: emailHtml,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=SendEmail.js.map