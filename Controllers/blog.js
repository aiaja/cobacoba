import { prisma } from "../Lib/prisma.js";

const blogController = {};

//HOME
blogController.getHomePage = async(req,res) => {
    try {
        const locals = {
            tittle: "Bluemonster Blog",
            description: "",
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await prisma.aggregate([
            {$sort: { createdAt: -1}}
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await prisma.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage: null,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"})
    }
};

//ABOUT
blogController.getAbout = (req,res) => {
    res.render('about', {
        currentRoute: '/about'
    });
};

//SEARCH
blogController.postSearchPost = async(req,res) => {
    try{
        const locals = {
            title: "Search",
            description: ""
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await prisma.find({
            $or: [
                {tittle: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                { body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Search Error"})
    }
};

export default blogController;