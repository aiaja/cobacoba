import { prisma } from "../Lib/prisma.js";

function postCreate(req,res) {
    async(req,res) => {
        await prisma.user.create({
            data: req.body
        })
        res.sendStatus(201);
    }
}

function getReadAll(req,res) {
    async(req,res)=>{
    const limit = req.query.limit
    const page = req.query.page

    const users = await prisma.users.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page)
    })
    res.json(users)
    }
};

function getRead(req,res) {
    async(req,res) => {
        const id = parseInt(req.params.id)
        const user = await prisma.users.findFirst({
            where:{
                id
            }
        })
        if(!user){
            res.status(404).json({
                Error:true,
                message:"user tidak ditemukan"
            })
            return
        }
        res.json(user)
    }
};

function putUpdate(req,res) {
    async(req,res) => {
        const id = parseInt(req.params.id)
        await prisma.users.update({
            data:req.body,
            where:{id}
        })
    
        res.sendStatus(200)
    }
};

function delDelete(req,res) {
    async(req,res) => {
        const id = parseInt(req.params.id)
        await prisma.users.delete({
            where:{id}
        })
    
        res.sendStatus(200)
    }
};

function postDef(req,res) {
    console.log("user post : ", req.body)
    res.sendStatus(201)
}

export {
    postDef,
    postCreate,
    getRead,
    getReadAll,
    putUpdate,
    delDelete,
};

// export const users = express.Router()

// users.get('/', (req, res) => {
//     res.send({users:[
//         "joko",
//         "dono"
//     ]});
// });

// //create user
// users.post('/create', async(req,res) => {
//     await prisma.user.create({
//         data: req.body
//     })
//     res.sendStatus(201);
// })

// //read All user
// users.get('/readAll', async(req,res)=>{
//     const limit = req.query.limit
//     const page = req.query.page

//     const users = await prisma.users.findMany({
//         take: limit && parseInt(limit),
//         skip: page && parseInt(page)
//     })


//     res.json(users)
// })

// //read user
// users.get('/read/:id', async(req,res) => {
//     const id = parseInt(req.params.id)
//     const user = await prisma.users.findFirst({
//         where:{
//             id
//         }
//     })
//     if(!user){
//         res.status(404).json({
//             Error:true,
//             message:"user tidak ditemukan"
//         })
//         return
//     }
//     res.json(user)
// })

// //update user
// users.put('/update/:id', async(req,res) => {
//     const id = parseInt(req.params.id)
//     await prisma.users.update({
//         data:req.body,
//         where:{id}
//     })

//     res.sendStatus(200)
// })

// users.delete('/delete/:id', async(req,res) => {
//     const id = parseInt(req.params.id)
//     await prisma.users.delete({
//         where:{id}
//     })

//     res.sendStatus(200)
// })