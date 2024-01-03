const User = require("../model/userModel");
const bcrypt = require("bcrypt") //used for encryption of the password !


const register =async(req,res,next)=>{
  console.log(req.body);
  try{
    const {username,email,password} = req.body;
  const checkUserName = await User.findOne({username});
  if(checkUserName){
    return res.json({msg:"This user name is already created !" , status:false});
  }
  const checkEmail = await User.findOne({email});
  if(checkEmail){
    return res.json({msg:"This email is already created !" , status:false})
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const user =await User.create({
    email,
    username,
    password:hashedPassword
  });
  //don't want to display password
delete user.password
  return res.json({status:true,user})
  // return res.json({status:true,msg:"User created successfully!"})
  }
  catch(error){
    next(error);
  }
}

const login =async(req,res,next)=>{
 
  try{
    const {username ,password} = req.body;
   
  const matchUser = await User.findOne({username});
  console.log(matchUser)
  if(!matchUser){
    return res.json({msg:"Incorrect Username or Password !" , status:false});
  }
 const comparePassword = await bcrypt.compare(password , matchUser.password);
 if(!comparePassword){
  return res.json({msg:"Incorrect Username or Password !" , status:false});
}
  //don't want to display password
delete matchUser.password
  return res.json({status:true,matchUser})
  // return res.json({status:true,msg:"Successfully logged-in!"})
  }
  catch(error){
    next(error);
  }
}
const avatar=async(req,res,next)=>{
  try{
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });

  }
  catch(error){
    next(error)
  }

}
const getAllUser =async(req,res,next)=>{

  try{
    const users = await User.find({_id:{$ne:req.params.id}}).select([
      "username",
      "email",
      "avatarImage",
      "_id"

    ]);
    return res.json(users);

  }
  catch(error){
    next(error)
    
  }

}

module.exports={register ,login,avatar,getAllUser};
