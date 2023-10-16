import mongoose, { Model } from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        ref:'user',
    },
    products: [
        {
            productId: { type: String , required:true, },
            productName:{type: String,required:true},
            color:{type:String,default:''},
            size:{type:String,default:''},
            slug:{type:String,required:true},
            quantity: { type: Number, default: 1 , required:true},
            price:{type:Number,required:true},
        }
    ],
    phone:{
        type:String,
        required:true,
    },
    address: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String, default: "Pending", required: true,
    }
},{timestamps:true})





const Order = mongoose.models.Order ||  mongoose.model('Order',OrderSchema);




export default Order;
