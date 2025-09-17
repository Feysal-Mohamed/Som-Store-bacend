const UserModel = require("../Models/costomerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---------------- Register User ----------------
const registerUser = async (req, res) => {
  try {
    const { Name, Phone, Email, Password, role } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ Email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create new user
    const newUser = new UserModel({
      Name,
      Phone,
      Email,
      Password: hashedPassword,
      role: role || "customer",
    });

    await newUser.save();

    res.status(201).json({
      message: `${newUser.role} registered successfully`,
      user: {
        Name: newUser.Name,
        Email: newUser.Email,
        Phone: newUser.Phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Login User ----------------
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await UserModel.findOne({ Email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(400).json({ message: "Password is incorrect" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      Name: user.Name,
      Email: user.Email,
      Phone: user.Phone,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Get All Users (Admin Only) ----------------
const getAllUsers = async (req, res) => {
  try {
    // ✅ Ensure only admins can see all users
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await UserModel.find().select("-Password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Make User Admin ----------------
const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Allow only existing admins to promote others
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can promote users" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    ).select("-Password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User promoted to admin",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ---------------- Remove Admin (Demote to Customer) ----------------
const removeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only allow if user exists
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: "customer" },
      { new: true }
    ).select("-Password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Admin removed. User is now customer",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  makeAdmin,
  removeAdmin, // ✅ new
};
