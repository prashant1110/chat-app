import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/Socket.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: recevierId } = req.params;
    const senderId = req.user.id;

    //to check if the conversation between sender and receiver exists
    let conversation = await prisma.conversations.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, recevierId],
        },
      },
    });

    //if no previous conversation start new conversation
    if (!conversation) {
      conversation = await prisma.conversations.create({
        data: {
          participantIds: {
            set: [senderId, recevierId],
          },
        },
      });
    }

    //create message 
    const newMessage = await prisma.message.create({
      data: {
        sednerId: senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    //connect message to the conversation
    if (newMessage) {
      conversation = await prisma.conversations.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    const socketId=getReceiverSocketId(recevierId)

    if(socketId){
      io.to(socketId).emit("newMessage",newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sender message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id: chatWithUserId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma?.conversations.findFirst({
      where: {
        participantIds:{
          hasEvery:[senderId,chatWithUserId],
        }
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("Error in sender message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserForSidebar =async (req: Request, res: Response) => {
  try {
    const userId=req.user.id;
    
    const users=await prisma.user.findMany({
      where:{
        id:{
          not:userId
        }
      },
      select:{
        id:true,
        fullname:true,
        profilePic:true
      }
    })

    res.status(200).json(users)
  } catch (error :any) {
    console.log("Error in user for sidebar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};