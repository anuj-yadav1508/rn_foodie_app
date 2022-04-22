const express = require('express');
const Resturant = require('../models/Resturant');
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const FavouriteResturant = require('../models/FavouriteResturant');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../verify');
const router = express.Router();

//RETURANTS THINGS 

// creating a resturant
router.post('/create/new', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newResturant = new Resturant(req.body);

        const savedResturant = await newResturant.save();

        return res.status(200).json(savedResturant);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// deleting a resturant
router.delete('/delete/:resturantId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedRes = await Resturant.findByIdAndDelete(req.params.resturantId);

        return res.status(200).json({msg: 'res deleted', deletedRes});
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// updating a resturant
router.patch('/update/:resturantId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedRes = await Resturant.findByIdAndUpdate(req.params.resturantId, { $set: req.body}, {new: true});

        return res.status(200).json(updatedRes);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// getting a particular resturant
router.get('/particular/:resturantId', verifyToken, async (req, res) => {
    try {
        const resturant = await Resturant.findOne({ _id: req.params.resturantId });

        return res.status(200).json(resturant);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// getting all resturants
router.get('/allresturants', verifyToken, async(req, res) => {
    try {
        const resturants = await Resturant.find();

        return res.status(200).json(resturants);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// MENU ITEMS THINGS

// create a menu
router.post('/menu/create/new', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newMenu = new MenuItem(req.body);

        const savedMenu = await newMenu.save();

        return res.status(200).json(savedMenu);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// delete a menu
router.delete('/menu/delete/:menuId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedMenu = await MenuItem.findByIdAndDelete(req.params.menuId);

        return res.status(200).json({msg: 'menu deleted', deletedMenu});
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// update a menu
router.patch('/menu/update/:menuId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedMenu = await MenuItem.findByIdAndUpdate(req.params.menuId, { $set: req.body}, {new: true});

        return res.status(200).json(updatedMenu);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// get all menus
router.get('/menu/allmenus', verifyToken, async (req, res) => {
    try {
        const menus = await MenuItem.find();

        return res.status(200).json(menus);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// CATEGORIES THINGS

// create a category
router.post('/category/create/new', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newCategory = new Category(req.body);

        const savedCategory = await newCategory.save();

        return res.status(200).json(savedCategory);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// deleting a category
router.delete('/menu/delete/:categoryId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedCategory = await MenuItem.findByIdAndDelete(req.params.categoryId);

        return res.status(200).json({msg: 'category deleted', deletedCategory});
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// updating a category
router.patch('/category/update/:categoryId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, { $set: req.body}, {new: true});

        return res.status(200).json(updatedCategory);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// getting all categories
router.get('/category/allcategories', verifyToken, async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


// FAVOURITE RESTURANTS KIND OF THINGS

// favouriting a resturant
router.post('/favouriting/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userFavData = await FavouriteResturant.findOne({ userId: req.params.userId});

        if(userFavData) {
            userFavData.favouriteResturants.push(req.body.resturantId);

            const savedAgain = await userFavData.save();

            return res.status(200).json(savedAgain);
        } else {
            const newFavData = new FavouriteResturant({
                userId: req.params.userId,
                favouriteResturants: [req.body.resturantId],
            });

            const savedData = await newFavData.save();

            return res.status(200).json(savedData);
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// defavouriting a resturant
router.post('/defavouriting/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userFavData = await FavouriteResturant.findOne({ userId: req.params.userId });

        if(userFavData.favouriteResturants.length === 1) {
            const deletedData = await FavouriteResturant.findOneAndDelete({ userId: req.params.userId });

            return res.status(200).json({msg: 'deleted completely', deletedData});
        } else {
            userFavData.favouriteResturants = userFavData.favouriteResturants.filter(id => id !== req.body.resturantId);

            const savedAgain = await userFavData.save();

            return res.status(200).json(savedAgain);
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// getting favourite resturants of a particular user
router.get('/allfavouriteresturants/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userFavData = await FavouriteResturant.findOne({ userId: req.params.userId });

        return res.status(200).json(userFavData);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;