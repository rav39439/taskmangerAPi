const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const NUser = require("../model/usermodel");

// const signup=async(req,res)=>{
//     console.log("signup")
//     // if(!req.body){
//     //     res.status(200).json({message:"no data"})   
//     //     console.log(req.body)
//     // }
//    const {username,email,password}=req.body;
//    try{
//     const existinguser=await NUser.findOne({email})
//     if(existinguser){
//         return res.status(404).json({message:"user already exist"})
//     }
//     const hashedpassword=await bcrypt.hash(password,12)
//     console.log({username:username,email:email,password:hashedpassword})    
//     const newuser=await NUser.create({username:username,email:email,password:hashedpassword,joinedOn:new Date().toISOString()})
//     const token=jwt.sign({email:newuser.email,id:newuser._id},"test",{expiresIn:'1h'})
//     console.log(token)
//     res.status(200).json({result:newuser,token})
//    } 
//    catch(err){
//     console.log(err)
//     // res.status(500).json("something wrong")
//    }
// }

const signup = async (req, res) => {
    console.log("Signup attempt...");
  
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    try {
      // Run DB query and password hashing in parallel
      const [existingUser, hashedPassword] = await Promise.all([
        NUser.findOne({ email }),
        bcrypt.hash(password, 12)
      ]);
  
      if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists" });
      }
  
      // Create new user
      const newUser = await NUser.create({
        username,
        email,
        password: hashedPassword,
        joinedOn: new Date().toISOString(),
      });
  
      // Generate JWT Token
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", { expiresIn: "1h" });
  
      res.status(201).json({ success: true, message: "Signup successful", data: { user: newUser, token },result:newUser,token });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };



 const login=async(req,res)=>{
const {email,password}=req.body;
console.log('loginid')
console.log(email)

try{
    const existinguser=await NUser.findOne({email})
    if(!existinguser){
        return res.status(404).json({message:"User do not exist"})
    }
    const isPasswordCrt=await bcrypt.compare(password,existinguser.password)
    if(!isPasswordCrt){
        return res.status(400).json({message:"Invalid credential"})
    }
const token=jwt.sign({email:existinguser.email,id:existinguser._id},"test",{expiresIn:'1h'})
console.log(token)
res.status(200).json({result:existinguser,token})
} catch(err){
    res.status(404).json({message:"something went wrong"})
}
}


module.exports={signup,login}