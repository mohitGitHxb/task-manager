import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date,
        required:true,
        default:Date.now().toLocaleString(),
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending",
    },
    userId:{
        type:mongoose.Types.ObjectId,
    }

})

export const  Tasks = mongoose.model.tasks || mongoose.model("Tasks",TaskSchema);

