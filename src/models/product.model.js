import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        new_price: {
            type: Number,
            required: true,
        },
        old_price: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        imgs: {
            type: Array,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        viewerIds: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const productModel = mongoose.model("products", productSchema);

export { productModel };
