const User = require("../modals/user"); // Double check: should be "models", not "modals"
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const authFunc = {
  register: async (req, res) => {
    // console.log(" treq body", req.body);
    
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.json({ token: generateToken(user._id) });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
  }
};

module.exports = authFunc;
