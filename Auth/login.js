import express from "express";
import { prisma } from "../Lib/prisma.js";
import {hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const POST = async(req,res) => {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {username},
        })
        if(!user){
            res.status(404).json({message: "User tidak ditemukan"});
        }else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch){
                const token = jwt.sign({username}, process.env.JWT_KEY, {
                    expiresIn: "10h",
                });
                const id = user.id;

                res.status(200).json({token, id});
            }else {
                res.status(401).json({message: "Password Salah"});
            }
        }
}

export function authenticateToken (req,res,next) {
    const token = req.header("Authorization");
    if(!token) {
        return res.status(401).json({message: "Authentifivation Failed"})
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            console.error("JWT VERIFICATION ERROR", error);
            return res.status(403).json({message: "FORBIDDEN: Token Invalid!"})
        }
        req.user = user;
        next();
    })
}