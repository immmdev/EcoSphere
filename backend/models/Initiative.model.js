import mongoose from 'mongoose';
const {Schema} = mongoose;

const initiativeSchema = new Schema({
    leader:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    description:String,
    imgUrl:String,
    category:String,
    location:String,
    members:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const Initiative= mongoose.model("Initiative", initiativeSchema);

export default Initiative;