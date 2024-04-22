import express from "express";
import blogController from "../Controllers/blog.js";
const router = express.Router();

router.get('/', blogController.getHomePage);
router.get('/about', blogController.getAbout);
router.post('/search', blogController.postSearchPost)

export default router;
// //HOME
// router.get('/', async(req,res) => {
//     try {
//         const locals = {
//             tittle: "Bluemonster Blog",
//             description: "",
//         }

//         let perPage = 10;
//         let page = req.query.page || 1;

//         const data = await Post.aggregate([
//             {$sort: { createdAt: -1}}
//         ])
//         .skip(perPage * page - perPage)
//         .limit(perPage)
//         .exec();

//         const count = await Post.countDocuments();
//         const nextPage = parseInt(page) + 1;
//         const hasNextPage = nextPage <= Math.ceil(count / perPage);

//         res.render('index', {
//             locals,
//             data,
//             current: page,
//             nextPage: hasNextPage ? nextPage: null,
//             currentRoute: '/'
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message: "Internal Server Error"})
//     }
// });

// //ABOUT
// router.get('/about', (req,res) => {
//     res.render('about', {
//         currentRoute: '/about'
//     });
// });

// //SEARCH
// router.post('/search', async(req,res) => {
//     try{
//         const locals = {
//             title: "Search",
//             description: ""
//         }

//         let searchTerm = req.body.searchTerm;
//         const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

//         const data = await Post.find({
//             $or: [
//                 {tittle: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
//                 { body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
//             ]
//         });

//         res.render("search", {
//             data,
//             locals,
//             currentRoute: '/'
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message: "Internal Server Search Error"})
//     }
// })

// const blog = {
//     router,
//     basePath: '/blog'
// };

// export default blog;