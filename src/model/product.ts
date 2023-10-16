import mongoose, { 
    
 } from "mongoose";
import { type } from "os";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique:true
        }
    ,
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
        
    },
    productImages:{
        type:Array<String>,
        default:[],
    },
    price:{
        type:Number,
        required:true,
    },
    
    availableQty: {
        type: Number, required: true,
    }
},{timestamps:true})




const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);


export default Product;
