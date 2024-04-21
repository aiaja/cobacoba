import express from "express";
import { prisma } from "../Lib/prisma.js";
import {hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const POST = async(req,res) => {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // check jika email sudah tersedia sebelumnya
        const exitingUserByEmail = await prisma.user.findUnique({
            where: {email:email}
        });
        if(exitingUserByEmail) {
            return res.status(409).json({ user: null, message: "Pengguna dengan email tersebut sudah tersedia sebelumnya" });
        }
        // check jika email sudah tersedia sebelumnya
        const exitingUserByUsername = await prisma.user.findUnique({
            where: {username:username}
        });
        if(exitingUserByEmail) {
            return res.status(409).json({ user: null, message: "Pengguna dengan username tersebut sudah tersedia sebelumnya" });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json( {user : newUser, message: "Registrasi Berhasil"});        
    } catch (error) {
        console.log("Error Hashing Password: " + error);
        res.status(500).json({message : "Registrasi Gagal!"});        
    }
}

export default POST;