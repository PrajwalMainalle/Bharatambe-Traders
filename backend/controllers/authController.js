const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new tenant business
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { businessName, ownerName, email, mobileNumber, password } = req.body;

  if (!businessName || !ownerName || !email || !mobileNumber || !password) {
    return res.status(400).json({ message: "Please enter all required fields" });
  }

  try {
    // Check if user email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create user/tenant
    const user = await User.create({
      businessName,
      ownerName,
      email,
      mobileNumber,
      password,
      profile: {
        shopName: businessName, // default to business name
        mobileNumber: mobileNumber,
        email: email,
      }
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        businessName: user.businessName,
        ownerName: user.ownerName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        token: generateToken(user._id),
        profile: user.profile,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

// @desc    Authenticate user and get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    // Check user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        businessName: user.businessName,
        ownerName: user.ownerName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        token: generateToken(user._id),
        profile: user.profile,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

// @desc    Get tenant profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        businessName: user.businessName,
        ownerName: user.ownerName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profile: user.profile,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// @desc    Update tenant profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.businessName = req.body.businessName || user.businessName;
      user.ownerName = req.body.ownerName || user.ownerName;

      // Update profile sub-fields
      const {
        shopName,
        gstNumber,
        businessAddress,
        logo,
        businessDescription,
        state,
        pincode,
        mobileNumber,
        email,
      } = req.body;

      user.profile = {
        shopName: shopName !== undefined ? shopName : user.profile.shopName,
        gstNumber: gstNumber !== undefined ? gstNumber : user.profile.gstNumber,
        businessAddress: businessAddress !== undefined ? businessAddress : user.profile.businessAddress,
        logo: logo !== undefined ? logo : user.profile.logo,
        businessDescription: businessDescription !== undefined ? businessDescription : user.profile.businessDescription,
        state: state !== undefined ? state : user.profile.state,
        pincode: pincode !== undefined ? pincode : user.profile.pincode,
        mobileNumber: mobileNumber !== undefined ? mobileNumber : (user.profile.mobileNumber || user.mobileNumber),
        email: email !== undefined ? email : (user.profile.email || user.email),
      };

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        businessName: updatedUser.businessName,
        ownerName: updatedUser.ownerName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
        profile: updatedUser.profile,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating profile", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
