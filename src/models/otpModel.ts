import mongoose from 'mongoose';

const OtpVerificationSchema=new mongoose.Schema({
    email:{type:String, required:true},
    otp:{type:String, required:true},
    time:{type:Number,required:true}
});

export const OtpVerificationModel=mongoose.model("OtpVerification",OtpVerificationSchema);