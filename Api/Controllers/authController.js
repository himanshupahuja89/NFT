const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");

const signToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


const createSendToken = async (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        },
    });

};


const signUp = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser, 201, req, res);
};


const login = async (req, res, next) => {
    const { email, password } = req.body;

    //check if email and password exists
    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide username and password!",
        })
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
        });
    }

    //Check if everything is OK, send token to client
    createSendToken(user, 200, req, res);
}

module.exports = {
    signUp,
    login
}