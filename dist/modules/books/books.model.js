"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const books_constrain_1 = require("./books.constrain");
const bookSchema = new mongoose_1.Schema({
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
        enum: Object.values(books_constrain_1.BookGenre),
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
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
bookSchema.pre("save", function () {
    this.available = Number(this.copies) > 0;
});
bookSchema.post("save", function (doc) {
    console.log(`${doc.title} saved successfully`);
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
