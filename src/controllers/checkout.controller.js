import { productModel } from "../models/product.model.js";
import { userModel } from "../models/user.model.js";

async function checkoutController(req, res) {
    const { _id } = req.body;
    const user = await userModel.findOne({ _id });
    const cart = user.cart;
    let amt = 0;
    const calculateAmount = async () => {
        for (let item of cart) {
            const temp = await productModel.findOne({ _id: item.id });
            amt += temp.new_price * item.count;
        }
        res.status(200).json({ message: "Checkout summary", totalAmt: amt });
    };
    calculateAmount();
}

export { checkoutController };
