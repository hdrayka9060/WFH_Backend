import mongoose from "mongoose";

const RequestSchema=new mongoose.Schema({
    orgUniqName:{type:String,required:true},
    userEmail:{type:String,required:true},
    requestStatus:{type:String,required:true},
    rejectionReason:{type:String,required:true},
    wfhReason:{type:String, required:true},
    deleted:{type:Boolean,required:true},

    approvalAtDay:{type:Number,required:true},
    approvalAtMonth:{type:Number,required:true},
    approvalAtYear:{type:Number,required:true},

    createdAtDay:{type:Number,required:true},
    createdAtMonth:{type:Number,required:true},
    createdAtYear:{type:Number,required:true},
    
    availedAtDay:{type:Number,required:true},
    availedAtMonth:{type:Number,required:true},
    availedAtYear:{type:Number,required:true}
});

export const RequestsModel=mongoose.model("Requests",RequestSchema);