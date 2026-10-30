import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {

        const { token } = req.headers;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Login Again"
            });
        }

        // Verify token
        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Check admin credentials
        if (
            typeof token_decode !== "object" ||
            token_decode.email !== process.env.ADMIN_EMAIL
        ) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Login Again"
            });
        }

        // Token is valid
        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};

export default adminAuth;