import mongoose, { Schema, model, models } from "mongoose";

const AddressSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});

export const Address = models?.Address || model("Address", AddressSchema);
