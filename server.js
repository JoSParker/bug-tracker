const express= require('express');
const authRoutes=require('./routes/authRoutes.js')
const connectDB=require('./config/db.js');
const authMiddleware=require('./middleware/authMiddleware.js')
const bugRoutes=require('./routes/bugRoutes.js');
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("server running");
})
const PORT=5000;
connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/bugs',bugRoutes);
app.get('/api/protected',authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"accessed protexted route",
        user:req.user
    })
})
app.listen(PORT,()=>{
    console.log("server running on port"+PORT);
})
