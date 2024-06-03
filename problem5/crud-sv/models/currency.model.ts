import mongoose from "mongoose";

const currencyScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: "link to an icon for coin",
    },
    date: {
      type: String,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Currency = mongoose.model("Currency", currencyScheme);

export default Currency;
