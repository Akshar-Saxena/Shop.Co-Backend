import { userModel } from "../models/user.model.js";
import { getAccessToken } from "../constants/getAccessToken.js";

async function loginController(req, res) {
    const { email, pass } = req.body;
    const users = await userModel.find({ email });
    if (users.length > 0) {
        const password = users[0].password;
        if (pass == password) {
            const token = getAccessToken({ _id: users[0]._id.toString() });
            await userModel.findOneAndUpdate(
                { email },
                { lastLogged: new Date().toString() }
            );
            res.status(200)
                .cookie("access_token", token, {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                })
                .json({ message: "Login successful" });
        } else {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
    } else {
        res.status(404).json({ message: "No user exists" });
    }
}

async function registerController(req, res) {
    const { username, email, pass, address } = req.body;
    const emailCheck = await userModel.find({ email });
    const nameCheck = await userModel.find({ username });

    if (emailCheck.length > 0) {
        res.status(400).json({
            message: "User with this email already exists",
        });
        return;
    }

    if (nameCheck.length > 0) {
        res.status(400).json({
            message: "User with this username already exists",
        });
        return;
    }

    const newUser = new userModel({
        username,
        email,
        password: pass,
        shippingAddress: address,
    });

    newUser
        .save()
        .then((e) => {
            const token = getAccessToken({ _id: e._id.toString() });
            res.status(201)
                .cookie("access_token", token, {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                })
                .json({ message: "User created successfully" });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ message: "Error in creating user" });
        });
}

async function profileController(req, res) {
    const { _id } = req.body;
    const user = await userModel.find({ _id: _id });
    res.status(200).json({
        message: "User found",
        details: { ...user[0]._doc },
    });
}

export { loginController, registerController, profileController };
