import { productModel } from "../models/product.model.js";
import { userModel } from "../models/user.model.js";

async function getCartController(req, res) {
    const { _id } = req.body;
    const user = await userModel.findOne({ _id });

    const resCart = [];

    const getProductInfo = async (i) => {
        const product = await productModel.findOne({ _id: user.cart[i].id });
        resCart.push({
            ...product._doc,
            count: user.cart[i].count,
        });
    };

    if (user.cart.length > 0) {
        for (let i = 0; i < user.cart.length; i++) {
            await getProductInfo(i);
        }
    }

    res.status(200).json({
        message:
            user.cart.length == 0
                ? "Cart is empty"
                : `Cart has ${user.cart.length} items`,
        cart: resCart,
    });
}
async function addCartController(req, res) {
    const { _id, productId } = req.body;
    if (_id.length != 24 || productId.length != 24) {
        res.status(400).json({ message: "Invalid user or product ID" });
        return;
    }
    const user = await userModel.findOne({ _id });
    const product = await productModel.findOne({ _id: productId });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    let cart = user.cart;
    let flag = false;

    if (product) {
        cart.forEach((item, id) => {
            if (item.id == productId) {
                item.count += 1;
                flag = true;
            }
        });
        if (!flag) {
            cart.push({ id: productId, count: 1 });
        }
        await userModel.findOneAndUpdate({ _id }, { cart });
        res.status(200).json({ message: "Product added to the cart" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}
async function removeCartController(req, res) {
    const { _id, productId } = req.body;
    if (_id.length != 24 || productId.length != 24) {
        res.status(400).json({ message: "Invalid user or product ID" });
        return;
    }
    const user = await userModel.findOne({ _id });
    const product = await productModel.findOne({ _id: productId });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const cart = user.cart;
    if (cart.length == 0) {
        res.status(200).json({ message: "Cart is empty" });
        return;
    }
    let flag = false;
    let removeId;
    cart.forEach((item, id) => {
        if (item.id == productId) {
            flag = true;
            if (item.count == 1) {
                removeId = id;
                return;
            } else {
                item.count -= 1;
                return;
            }
        }
    });
    if (removeId != undefined) {
        cart.splice(removeId, 1);
    }
    if (!flag) {
        res.status(404).json({ message: "Product not found" });
        return;
    } else {
        await userModel.findOneAndUpdate({ _id }, { cart });
        res.status(200).json({ message: "Cart updated" });
    }
}

export { addCartController, removeCartController, getCartController };
