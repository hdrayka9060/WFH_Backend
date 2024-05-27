import { EmailOtpTime } from "../typings/otpTypings";
import { OtpVerificationModel } from "../models/otpModel";

export class OtpDao {
    /*
    * Function to get users otp and timestamp
    */
    public static async getUserOtp(email: string): Promise<EmailOtpTime> {
        const res = await OtpVerificationModel.findOne({ email }).lean();
        return res;
    }

    /*
    * Function to add new users otp and timestamp details
    */
    public static async addUserOtp(obj: EmailOtpTime): Promise<boolean> {
        await OtpVerificationModel.create({ email: obj.email, otp: obj.otp, time: obj.time });
        return true;
    }

    /*
    * Function to update users otp and timestamp details
    */
    public static async updateUserOtp(obj: EmailOtpTime): Promise<boolean> {
        const res = await OtpVerificationModel.updateOne({ email: obj.email }, { $set: { otp: obj.otp, time: obj.time } });
        if (res.modifiedCount === 1) return true;
        return false;
    }

}
