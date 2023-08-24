import nodemailer, { Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
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
export const sendEmail = async (
    email: string,
    subject: string,
    otpCode: string
) => {
    const replaceVariables = (
        template: string,
        variables: Record<string, string>
    ) => {
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
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

