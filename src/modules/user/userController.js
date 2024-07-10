import { User } from "../../../db/models/userModel.js"
import bcrypt from"bcrypt"
import jwt from "jsonwebtoken"



const signup=async(req , res)=>{
    //create new user 
    let user = await User.insertMany(req.body);
    user[0].password = undefined
    res.status(201).json({message :"SignUp is successed" , user});
    
}
const signin=async(req , res)=>{ 
    let user;

    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else if (req.body.phone) {
      user = await User.findOne({ phone: req.body.phone });
    }else if (req.body.recoverEmail) {
        user = await User.findOne({ phone: req.body.phone });
      }

    if( !user || !bcrypt.compareSync(req.body.password , user.password) ){
        res.json({message:"login is faild"})
    }
    //generte a token to login
    const token = jwt.sign({ userId: user._id , role: user.role},process.env.LOGIN_SECRET);
    // response
    res.status(200).json({ message: "Login success", token });
    res.status="online";
    res.save();

}
const  updateUser =async(req , res)=>{
    const { email, mobileNumber } = req.body;

    // Check for conflicts
    if (email && email !== req.user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }
    }
    if (mobileNumber && mobileNumber !== req.user.mobileNumber) {
        const mobileExists = await User.findOne({ mobileNumber });
        if (mobileExists) {
            return res.status(400).json({ message: 'Mobile number already in use' });
        }
    }
    let user = await User.findByIdAndUpdate(req.params.id , req.body ,{new :true})
    res.status(200).json({message:"user is update successefuly" , user})
}
const  deleteUser =async(req , res)=>{
    let user = await User.findByIdAndDelete(req.params.id , req.body ,{new :true})
    if(!user)return res.status(404).json({message:"user not found"})
    res.status(200).json({message:"user data is deleted successefuly" , user})
}
const  profileUser =async(req , res)=>{
    const user = await User.findById(req.params.userId);
    if (!user)return res.status(404).json({ message: 'User not found' });
    // Exclude sensitive fields
    const { password, otp, otpExpiry, ...profileData } = user.toObject();
    res.json({message:"success" , profileData});
}
// Get User Account Data
const  getUser =async(req , res)=>{
     // req.user already contains the authenticated user's ID
     const user = await User.findById(req.user._id);
     if (!user)return res.status(404).json({ message: 'User not found' });
     // Exclude sensitive fields like password, otp, etc.
     const { password, otp, otpExpiry, ...userData } = user.toObject();

     res.json({message:"success", user: userData });
}
const updatePassword=async(req,res)=>{
    const { currentPassword, newPassword } = req.body;
        // Fetch the user
        const user = await User.findById(req.user._id);
        if (!user)return res.status(404).json({ message: 'User not found' });
        // Check if the current password is correct
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect current password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, process.env.NEW_HASH);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
}
const forgetPassword=async(req,res)=>{
    const { otp, newPassword } = req.body;
    let users;
    if (req.body.email) {
        users = await User.findOne({ email: req.body.email });
    } else if (req.body.phone) {
        users = await User.findOne({ phone: req.body.phone });
    }else if (req.body.recoverEmail) {
        users = await User.findOne({ phone: req.body.phone });
    }
      // Find all users with the given email
    if (users.length === 0) return res.status(404).json({ message: 'No accounts found with that email' });
     // Send OTPs to all matching users 
     for (const user of users) {
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // Expires in 15 minutes
      }
      users.otp = hashedOTP;
      users.otpExpiry = otpExpiry;
      // Check if OTP is valid and not expired
      const otpMatch = await bcrypt.compare(otp, users.otp);
      if (!otpMatch || users.otpExpiry < Date.now()) {
          return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, process.env.NEW_HASH);
      users.password = hashedPassword;
      users.otp = undefined; // Clear the OTP
      users.otpExpiry = undefined;
      await users.save();
      res.json({ message: 'Password reset successful' });
             // Send the OTP to the users's recovery email
             res.json({ message: 'OTPs sent to the associated email addresses' }); 
}
const resetPassword=async(req,res)=>{
    const { otp, newPassword } = req.body;
    let users;
    if (req.body.email) {
        users = await User.findOne({ email: req.body.email });
    } else if (req.body.phone) {
        users = await User.findOne({ phone: req.body.phone });
    }else if (req.body.recoverEmail) {
        users = await User.findOne({ phone: req.body.phone });
    }
      // Find all users with the given email
    if (users.length === 0) return res.status(404).json({ message: 'No accounts found with that email' });
     // Send OTPs to all matching users 
     for (const user of users) {
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // Expires in 15 minutes
      }
      users.otp = hashedOTP;
      users.otpExpiry = otpExpiry;
      // Check if OTP is valid and not expired
      const otpMatch = await bcrypt.compare(otp, users.otp);
      if (!otpMatch || users.otpExpiry < Date.now()) {
          return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, process.env.NEW_HASH);
      users.password = hashedPassword;
      users.otp = undefined; // Clear the OTP
      users.otpExpiry = undefined;
      await users.save();
      res.json({ message: 'Password reset successful' });
             // Send the OTP to the users's recovery email
             res.json({ message: 'OTPs sent to the associated email addresses' }); 
}
const allRecoveryEmail=async(req,res)=>{
    const recoveryEmail = req.params.recoveryEmail;
        // Fetch users with the specified recovery email
        const users = await User.find({ recoveryEmail });
        if (users.length === 0)return res.status(404).json({ message: 'No accounts found with that recovery email' });
        // Sanitize the data to remove sensitive information
        const sanitizedUsers = users.map(user => {
            const { password, otp, otpExpiry, ...userData } = user.toObject();
            return userData;
        });
        res.json({message:"hello Company_Hr", users: sanitizedUsers });

}
export{
    signup,
    signin,
    updateUser,
    deleteUser,
    profileUser,
    getUser,
    updatePassword,
    forgetPassword,
    resetPassword,
    allRecoveryEmail



}