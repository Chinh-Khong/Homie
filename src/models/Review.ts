import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  room_id: { type: Number, required: true }, 
  email: { type: String, required: true }, 
  name: { type: String, required: true }, 
  avatar: { type: String, required: false }, 
  address: { type: String, required: false }, 
  date: { type: String, required: true }, 
  rating: { type: Number, required: true }, 
  description_review: { type: String, required: true }, 
}, { timestamps: true }); 

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);