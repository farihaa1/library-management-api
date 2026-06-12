import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.post("save", function (doc) {
  console.log(
    `Borrow record created: ${doc._id}`
  );
});

const Borrow = model<IBorrow>(
  "Borrow",
  borrowSchema
);



export default Borrow;