"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Library Management API",
    });
});
app.use((error, req, res, _next) => {
    void _next;
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: {
                name: error.name,
                errors: error.errors
            }
        });
    }
    const err = error;
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
        error
    });
});
exports.default = app;
