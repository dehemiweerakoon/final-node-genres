
module.exports =function(req,res,next){
    //req.user
    console.log(req.user.isAdmin);
    if(!req.user.isAdmin) return res.status(403).send('Acess denied') // unauthorized 
    
    next();
}