import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// Create JWT Token
const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET
    );
};


// ==================== USER LOGIN ====================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email and password
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Create token
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// ==================== USER REGISTER ====================

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Please enter all required fields"
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Check password length
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save user
        const user = await newUser.save();

        // Create token
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// ==================== ADMIN LOGIN ====================

const adminLogin = async (req, res) => {
    console.log(process.env.ADMIN_EMAIL);
    console.log(process.env.ADMIN_PASSWORD);
    try {

        const { email, password } = req.body;
        
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET
            );

            res.json({
                success: true,
                token
            });

        } else {

            res.json({
                success: false,
                message: "Invalid admin credentials"
            });

        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


export {
    loginUser,
    registerUser,
    adminLogin
};