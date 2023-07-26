import User from "../models/User.js";

/* READ */

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find(); // This will retrieve all users from the database
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const blockUser = async (req,res) => {
    try{
        console.log(req.body.userId,"klklkl");
        
        console.log(req.params,"pppppppp")
        console.log("inside blockUser")
        const  id  =req.body.userId
        console.log(id);
        const user = await User.findById(id)
        // console.log(user);
        if(user.block === false){
            user.block = true
        }else{
            user.block = false
        }

      
        const savedUSer = await user.save()
        const allUsers = await User.find()
        console.log(savedUSer,"lkjlkajfklasjdfkjl");
        res.status(201).json(allUsers)
    }catch(err){
        console.log(err,"asdfasfd");
        res.status(404).json({ message: err.message })
    }
}

export const deleteUser = async (req,res) => {
    try{
        const  id  =req.body.userId
        console.log(id,"jkjkjkj");
        const deletedUser = await User.findByIdAndDelete(id)
        
        
        const allUsers = await User.find({})
        console.log(allUsers);

       
        console.log("popoppopo");
        res.status(201).json(allUsers)

    }catch(err){
        res.status(404).json({ message: err.message })
    }
}


export const getUser = async (req,res) =>{
    try{
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req,res) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath}) => {
                return {_id,firstName,lastName,occupation,location,picturePath}
            }
        )
        res.status(200).json(formattedFriends)
    }catch(err){
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE*/
export const addRemoveFriend = async (req,res) => {
    try{
        const {id,friendId} = req.params
        const user= await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id)=> id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath}) => {
                return {_id,firstName,lastName,occupation,location,picturePath}
            }
        )
        res.status(200).json(formattedFriends)

    }catch(err){
        res.status(404).json({ message : err.message })
    }
}