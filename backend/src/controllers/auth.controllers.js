const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const signup=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered!"})
        }
        const hashedPassword=await bcrypt.hash(password,10)

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role: role || 'user'
        })

const token=jwt.sign(
    {
        userId:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'7d'
    }
)
res.status(201).json({
    message:"Account created successfully!",
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
})
    }
    catch (err) {
        res.status(500).json({message:"Server error", error:err.message})
    }
}
// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid credentials" 
      });
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: "Invalid credentials" 
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Send response (password ko exclude karo)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Server error during login" 
    });
  }
};


module.exports = { signup, login };