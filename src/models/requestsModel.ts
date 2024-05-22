import mongoose from "mongoose";

const RequestSchema=new mongoose.Schema({
    orgUniqName:{type:String,required:true},
    userEmail:{type:String,required:true},
    requestStatus:{type:String,required:true},
    rejectionReason:{type:String},
    wfhReason:{type:String, required:true},
    deleted:{type:Boolean,required:true},
    
    approvalAt:{type:Date},
    createdAt:{type:Date,required:true},
    availedAt:{type:Date,required:true},
});

export const RequestsModel=mongoose.model("Requests",RequestSchema);