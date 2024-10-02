import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessage = async(req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: recevierId } = req.params;
    const senderId = req.user.id;

    let conversation=await prisma.conversations.findFirst({where:{
        participantIds:{
            hasEvery:[senderId,recevierId]
        }
    }})

    if(!conversation){
        conversation=await prisma.conversations.create({
            data:{
                participantIds:{
                    set:[senderId,recevierId]
                }
            }
        })
    }

    const newMessage=await prisma.message.create({
        data:{
            sednerId:senderId,
            body:message,
            conversationId:conversation.id
        }
    })

    if(newMessage){
        conversation=await prisma.conversations.update({
            where:{
                id:conversation.id
            },
            data:{
                messages:{
                    connect:{
                        id:message.id
                    }
                }
            }
        })
    }

    res.status(201).json(newMessage)
  } catch (error) {}
};