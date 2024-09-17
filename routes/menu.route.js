
import { Router } from "express"
import Menu from "../models/menu.model.js"

const router = Router()

router.route("/").get(async (req, res) => {
    try {
        const displaymenu = await Menu.find()
        console.log(displaymenu);
        res.status(200).json(displaymenu)
    } catch (error) {
        console.log("error in menu route get req", error);
        res.status(500).json({ error: "internal server erorr" })
    }

})

router.route("/").post(async (req, res) => {
    try {
        const response = req.body;
        const getdata = new Menu(response)
        const getmenu = await getdata.save();
        console.log(getmenu);
        res.status(200).json(getmenu)
    } catch (error) {
        console.log("error in menu route of post req", error);
        res.status(500).json({ error: 'internal server errror' })
    }
})

router.route("/:taste").get( async (req, res) => {
    try {
        const tastetype = req.params.taste;
        const getdatabytaste = await Menu.find({ taste: tastetype })
        console.log(getdatabytaste);
        res.status(200).json(getdatabytaste)
    } catch (error) { 
        console.log(error)
        res.status(500).json({ error: " internal error in tastetype" })
    }

})

export default router