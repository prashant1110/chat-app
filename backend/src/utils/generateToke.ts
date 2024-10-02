import { Response } from "express";
import jwt from "jsonwebtoken"

const generateToken=(id:string,res:Response)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET!,{
        expiresIn:"15d"
    })

    res.cookie('jwt',token,{
        maxAge:15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV !== "development"
    })

    return token;
}

export default generateToken;