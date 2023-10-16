import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,

    },
    price:{
        type:Number,
        required:true,
    },
    color: {
        type: String,

    },
    size: {
        type: String,


    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    }

}, { timestamps: true })



let Cart = mongoose.models.Cart;

// If the model doesn't exist, compile it
if (!Cart) {
    Cart = mongoose.model('Cart', CartSchema);
}

export default Cart;