import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "../db/prisma.js";

declare global{
    namespace Express{
        export interface Request{
            user:{
                id:string;
            }
        }
    }
}


interface DecodeToken extends JwtPayload{
    id:string
}

const protectedRoute = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token=req.cookies.jwt

        if(!token){
            return res.status(401).json({error:"Unauthorized users"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as DecodeToken

        if(!decoded){
            return res.status(401).json({error:"Unauthorized users"})
        }

        const user =await prisma.user.findUnique({
          where: { id: decoded.id },
          select: {
            id: true,
            fullname: true,
            username: true,
            profilePic: true,
          },
        }); 

        if(!user){
            return res.status(401).json({error:"User not found"})
        }

        

        req.user=user as any;

        next();
    } catch (error) {
        
    }
};

export default protectedRoute;
