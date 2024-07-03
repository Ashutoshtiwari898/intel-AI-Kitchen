import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define schemas
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    kitchen_items: {
      Spices: { type: Schema.Types.Mixed, default: null },
      Proteins: { type: Schema.Types.Mixed, default: null },
      Fruits: { type: Schema.Types.Mixed, default: null },
      Vegetables: { type: Schema.Types.Mixed, default: null },
      Dairy: { type: Schema.Types.Mixed, default: null },
      Cooking_Vessels: { type: Schema.Types.Mixed, default: null },
      Appliances: { type: Schema.Types.Mixed, default: null }
    }
});

const User = mongoose.model('User', UserSchema);

export {
  User
}