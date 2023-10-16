import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    complaintTitle: {
        type:String,
        required: true
    },
    complaintDesc: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        required:true,
        default:"Pending",
    }

}, { timestamps: true })



let Complaints = mongoose.models.Complaints;

// If the model doesn't exist, compile it
if (!Complaints) {
    Complaints = mongoose.model('Complaints', ComplaintSchema);
}

export default Complaints;