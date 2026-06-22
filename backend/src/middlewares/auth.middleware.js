const jwt=require('jsonwebtoken');
const authenticate=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Authentication required"
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user ={
            userId:decoded.userId,
            role:decoded.role
        };
        return next()
    }catch(error){
        return res.status(401).json({
            message:"Token expired,please login again"
        });
    }
    
};
    
module.exports=
{authenticate};
