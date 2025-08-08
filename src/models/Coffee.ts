import { Schema, model } from "mongoose";

export interface Coffee {
  id: number;
  name: string;
  price: number;
  img: string;
  categories: string[];
  desc: string;
}

const CoffeeSchema = new Schema<Coffee>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    img: { type: String, required: true },
    categories: { type: [String], default: [] },
    desc: { type: String, default: "" },
  },
  { timestamps: true }
);

export const CoffeeModel = model<Coffee>("Coffee", CoffeeSchema);
