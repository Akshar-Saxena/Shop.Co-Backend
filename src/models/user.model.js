import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        orders: {
            type: Array,
            default: [],
        },
        cart: {
            type: Array,
            default: [],
        },
        lastLogged: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const userModel = mongoose.model("users", userSchema);

export { userModel };
