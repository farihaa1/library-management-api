import { model, Schema } from "mongoose";
import { BookModel, IBook, IBookMethods } from "./book.interface";
import { BookGenre } from "./books.constrain";

const bookSchema = new Schema<
    IBook,
    BookModel,
    IBookMethods>({
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            enum: Object.values(BookGenre),
            required: true,
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
        },
        description: String,
        copies: {
            type: Number,
            required: true,
            min: [0, "Copies must be a positive number"]
        },
        available: {
            type: Boolean,
            default: true
        }
    }, { timestamps: true })
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};

bookSchema.pre("save", function () {
    this.available = Number(this.copies) > 0;
});

bookSchema.post("save", function (doc) {
    console.log(`${doc.title} saved successfully`);
});
const Book = model<IBook, BookModel>("Book", bookSchema);
export default Book;