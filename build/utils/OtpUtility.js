"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtp = void 0;
const GenerateOtp = () => {
    let not_yet_four = true;
    while (not_yet_four) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const expiry = new Date();
        expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
        if (String(otp).length === 4) {
            not_yet_four = false;
            return { otp, expiry };
        }
    }
};
exports.GenerateOtp = GenerateOtp;
//# sourceMappingURL=OtpUtility.js.map