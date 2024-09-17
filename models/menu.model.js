import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name : {
       type :String,
       required : true 
    },
    price : {
        type : Number,
        required : true
    },
    taste : {
        type : String,
        enum : ['sour','spicy','sweet'],
        required : true

    },
    is_drink : {
        type : Boolean,
        default : false,
    }
},{timestamps : true})

const Menu = mongoose.model("Menu",menuSchema);

export default Menu