import mongoose from "mongoose";
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "owner"],

    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        unique : true,
    },
    address :{
        type:String
    },
    salary : {
        type:Number,
        required :true
    },
    username :{ 
        type : String,
        required : true
    },
    password : {
        type  :String,
        required : true
    }


}, { timestamps: true })

const Person = mongoose.model('Person',personSchema)

export default Person