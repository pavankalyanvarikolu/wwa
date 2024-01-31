// /middleware/authenticate.js

const jwt = require('jsonwebtoken');
const User = require("../model/User");

const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) { throw new Error("Couldn't find User") }

        req.email = rootUser.email;
        req.token = token;
        next();


    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = Authenticate;