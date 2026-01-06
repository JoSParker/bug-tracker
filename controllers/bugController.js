const Bug = require("../models/Bug");
const User = require("../models/Users.js");
exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 }); 
    return res.status(200).json({ bugs });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error,
    });
  }
};
exports.getBugsbyId = async (req, res) => {
  const bugId = req.params.id;
  try {
    const bug = await Bug.findById(bugId);
    if (!bug) {
      return res.status(404).json({ message: "bug not found" });
    }   
    return res.status(200).json({ bug });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error,
    });
  }
};
exports.updateBug=async(req,res)=>{
    const bugId=req.params.id;
    const {status,priority}=req.body;
    try{
        const bug=await Bug.findById(bugId);    
        if(!bug){
            return res.status(404).json({message:"bug not found"});
        }
        if(status){
            bug.status=status;
        }   
        if(priority){
            bug.priority=priority;
        }
        await bug.save();
        res.status(200).json({
            message:"bug updated successfully",
            bug,
        })
    }catch(error){
        res.status(500).json({
            message:"server error",
            error,
        })
    }
}
exports.createBug = async(req,res)=>{
    const {title,description,priority}=req.body;
    const userId=req.user.id;
    if(!title||!description){
        return res.status(400).json({
            message:"please provide all required fields"
        })
    }
    try{
        const newBug =await Bug.create({
            title,
            description,
            priority: priority ||"Low",
            createdBy:userId,
        })
        res.status(201).json({
            message:"bug created successfully",
            bug:newBug,
        })
    }
    catch(error){
        res.status(500).json({
            message:"server error",
            error,
        })
    }
}
exports.assignBug = async (req, res) => {
  const bugId = req.params.id;
  const { userId } = req.body;

  const actualUserId =
    typeof userId === "object" ? userId.userId : userId;

  if (!actualUserId) {
    return res.status(400).json({
      message: "please provide userId to assign the bug"
    });
  }

  try {
    const bug = await Bug.findById(bugId);
    if (!bug) {
      return res.status(404).json({ message: "bug not found" });
    }

    const user = await User.findById(actualUserId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    bug.assignedTo = actualUserId;
    await bug.save();

    return res.status(200).json({
      message: "bug assigned successfully",
      bug
    });

  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error
    });
  }
};
