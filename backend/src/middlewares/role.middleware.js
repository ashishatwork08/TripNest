const isHost = (req,res,next)=>{
    if(req.user.role !== 'host'){
        return res.status(403).json({
message: 'Access denied. Host role required.'
        });
    }   
    next();
};
const isUser = (req,res,next)=>{
    if(req.user.role != 'user'){
        return res.status(403).json({
            message: 'Access denied. User role required.'
        });
    }
    next();
};
module.exports ={ isHost,isUser};