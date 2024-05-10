import mongoose from 'mongoose';

const OrganisationSchema=new mongoose.Schema({
    orgUniqName:{type:String, required:true},
    orgDisplayName:{type:String, required:true},
    orgAdmin:{type:String, required:true},
    maxWfh:{type:Number, required:true},
    systemUser:{type:String,required:true},
    deleted:{type:Boolean,required:true}
});

export const OrganisationModel=mongoose.model("OrganisationDetails",OrganisationSchema);