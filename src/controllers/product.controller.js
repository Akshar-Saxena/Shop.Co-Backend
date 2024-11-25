import { productModel } from "../models/product.model.js";

async function productController(req, res) {
    const { _id, productId } = req.body;
    if (_id.length != 24 || productId.length != 24) {
        res.status(400).json({ message: "Invalid user or product ID" });
        return;
    }
    const product = await productModel.find({ _id: productId });
    if (product.length == 0) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    const views = product[0].views;
    const viewerIds = product[0].viewerIds;

    viewerIds.push(_id);

    await productModel.findOneAndUpdate(
        { _id: productId },
        { views: views + 1, viewerIds }
    );

    res.status(200).json({
        message: "Product found",
        details: { ...product[0]._doc },
    });
}

async function allProductController(req, res) {
    const products = await productModel.find({});
    res.status(200).json({ message: "All products", products });
}

async function newarrivalsController(req, res) {
    const newarrivals = await productModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
        message: "New arrivals",
        products: [
            newarrivals[0],
            newarrivals[1],
            newarrivals[2],
            newarrivals[3],
        ],
    });
}

async function topSellingController(req, res) {
    const topselling = await productModel.find({}).sort({ views: -1 });
    res.status(200).json({
        message: "Top Selling",
        products: [topselling[0], topselling[1], topselling[2], topselling[3]],
    });
}

export {
    productController,
    allProductController,
    newarrivalsController,
    topSellingController,
};
