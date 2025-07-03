import handleError from './errors/handleError.js';

const isAdmin = async (req,res,next)=>{
try {
     const user = req.user;
     console.log("******", user)
   if (!user) {
            return handleError(res, null, "wrong authentification", 401);
  }

  if (!user.isAdmin) {
            return handleError(res, null, "user is not admin ", 403);

  }
  next();

} catch (error) {
        return handleError(res, null, "error server", 500);

}

}
export default isAdmin