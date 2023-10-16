import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide username"],
        
    },
    email: {
        type: String,
        required: [true, "please provide username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please provide password"],


    },
    address:{
        type:String,
        default:'',
    },
    phone:{
        type:String,
        default:'',
    },
    pinCode:{
        type:String,
        default:'',
    },
    verificationToken:{
        type:String,
        default:'',
    },
    verified:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

let User = mongoose.models.User;

// userSchema.index({ email: 1 });


if (!User) {
  User = mongoose.model('User', userSchema);
}
export default User;