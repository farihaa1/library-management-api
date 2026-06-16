import { Model } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description?: string;
    copies: number;
    available: boolean
}

export interface IBookMethods {
    updateAvailability(): void;
}

export type BookModel = Model<
    IBook,
    Record<string, never>,
    IBookMethods
>;