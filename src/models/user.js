import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
    name:{
        type:String,
        default:"Username 666"
    },
    email:{
        type:String,
        required:[true,"Email is obligatory"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"],
    },
    profileURL:{
        type:String,
        default:""
    },
    about:{
        type:String,
        default:"Add a about us"
    },
})
export const User = mongoose.models.users || mongoose.model('users',UserSchema);