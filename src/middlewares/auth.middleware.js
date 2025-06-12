import jwt from"jsonwebtoken";
import dotenv from 'dotenv';
import handleError from "./errors/handleError.js";

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

const isAuth = (req,res, next) =>{
    try {
        const autheHeader = req.headers.authorization
        console.log("autheHeader", autheHeader)

        if (!autheHeader || !autheHeader.startsWith('Bearer ')) {
            console.log("ena honi")
            return handleError( res,null, "acces denied, no token provided", 401) // unothorization
        }
        const token = autheHeader.split(' ')[1]
        const decoded = jwt. verify (token, SECRET_KEY)
        req.user = decoded
next()
    } catch (error){
        return handleError (res, null, "invalid or expired token", 401)//unothorized
    }
} 
export default isAuth