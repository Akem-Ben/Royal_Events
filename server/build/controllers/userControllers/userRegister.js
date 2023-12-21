"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const registerUser = async (req, res) => {
    try {
        const { name, user_name, } = req.body;
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: 'error',
            message: `Internal Server Error`
        });
    }
};
exports.registerUser = registerUser;
