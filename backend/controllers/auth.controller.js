import bcrypt from "bcryptjs";
import CompanyUser from "../models/companyuser.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { companyName, phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await CompanyUser.findOne({ phoneNumber });

    if (user) {
      return res.status(400).json({ error: "User with this phone number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new CompanyUser({
      companyName,
      phoneNumber,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        companyName: newUser.companyName,
        phoneNumber: newUser.phoneNumber,
      });
    } else {
      res.status(400).json({ error: "Invalid user data " });
    }
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await CompanyUser.findOne({ phoneNumber });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      companyName: user.companyName,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.log("Error in login controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try{

    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message : "Logged out successfully"})

  } catch (error) {
    console.log("Error in logout controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
