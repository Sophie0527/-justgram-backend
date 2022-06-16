const { signup, login } = require("../services/user");

const signupController = async (req, res) => {
    const {email, password} = req.body;

    try {
        await signup(email,password);
        return res.status(201).json({ message: 'SIGNUP_SUCCESS'})
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};



const loginController = async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await login(email,password);
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

module.exports = {signupController,loginController};