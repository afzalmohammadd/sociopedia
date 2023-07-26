import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"
import User from "../models/User.js"
import Admin from "../models/Admin.js"

/* REGISTER USER */
export const register = async (req,res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash ,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000 ),
            impressions: Math.floor(Math.random() * 10000 )
        })
        const savedUSer = await newUser.save()
        res.status(201).json(savedUSer)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
} 

/* LOGGING IN */
export const login = async (req,res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(!user) return res.status(400).json({msg: "user does not exist"})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials. "})

        const token = Jwt.sign({ id:user._id},process.env.JWT_SECRET);
        delete user.password
        if(user.block === false){
            res.status(200).json({token,user})
        }else{
            const mes = "user is blocked"
            res.status(200).json({mes})
        }
        
    }catch(err){
        res.status(500).json({ error: err.message })
    }
} 

/* ADMIN SIGNUP */ 
// export const adminreg = async (req,res) => {
//     console.log("hai");
//     try{
//         console.log("hai");
//         const {
//             firstName,
//             email,
//             password,
//         } = req.body

//         const salt = await bcrypt.genSalt()
//         const passwordHash = await bcrypt.hash(password, salt)

//         const newAdmin = new Admin({
//             firstName,
//             email,
//             password : passwordHash ,
//         })
//         const savedAdmin = await newAdmin.save()
//         res.status(201).json(savedAdmin)
//     } catch (err) {
//         console.log("sfsfsffasfsafsaf");
//         res.status(500).json({ error: err.message  })
//     }
// } 
export const adminreg = async (req,res) => {
  
    try {
      const { firstName, email, password } = req.body;
      console.log(firstName,email,password)
  
    //   if (!firstName || !email || !password) {
    //     return res.status(400).json({ error: 'Missing required fields.' });
    //   }
  
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newAdmin = new Admin({
        firstName,
        email,
        password: passwordHash,
      });
      console.log("lllll");
  
      const savedAdmin = await newAdmin.save();
      res.status(201).json(savedAdmin);
    } catch (err) {
      console.error("Error during admin registration:", err);
      res.status(500).json({ error: err.message });
    }
  }


/* ADMIN LOGGING IN */
export const adminLogin = async (req,res) => {
    try{
        console.log("hai.........");
        const {email, password} = req.body
        const admin = await Admin.findOne({email: email})
        console.log(admin);
        if(!admin) return res.status(400).json({msg: "admin does not exist"})

        const isMatch = await bcrypt.compare(password, admin.password)
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials. "})

        const admintoken = Jwt.sign({ id:admin._id},process.env.JWT_SECRET);
  
        delete admin.password
        res.status(200).json({admin,admintoken})
    }catch(err){
        res.status(500).json({ error: err.message })
    }
} 
