
import { Router } from 'express';
import Person from '../models/person.model.js';

const router = Router()

router.route("/signup").post(async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log("response data saved ", data)
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'intrtnal server error' })
    }
})

router.route("/").get(async (req, res) => {
    try {
        const getdata = await Person.find();
        console.log(getdata)
        res.status(200).json(getdata)
    } catch (error) {
        console.log("Error in getreq of /person", error)
        res.status(500).json({ error: 'error in person get req' })
    }
})

router.route("/:work").get(async (req, res) => {
    try {
        const worktype = req.params.work
        if (worktype == 'owner' || worktype == 'chef' || worktype == "waiter") {

            const getdata = await Person.find({ work: worktype })
            console.log(getdata);
            res.status(200).json(getdata);
        } else {
            res.status(400).json({ error: 'invalid worktype' });
        }

    } catch (error) {
        res.status(500).json({ error: 'error in catch block worktype' })
        console.log("errror in person worktype", error);
    }
})

const middle = function (req, res, next) {
    console.log(`${new Date().toLocaleString()} request made to original url ${req.originalUrl}`);
    next()
}
router.route("/:id").put(middle, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPerson = await Person.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json(updatedPerson);
    } catch (error) {
        console.log("Error in updating the document of persons", error);
        res.status(500).json({ error: "Error in updating the document of persons" });
    }
});

router.route("/:id").delete(middle,async (req, res) => {
    try {
        const { id } = req.params
        const deletedocument = await Person.findByIdAndDelete(id)
        if (!deletedocument) {
            return res.status(500).json('not deleted')
        }
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.send(500).json({ error: "error in delete method" })
    }
})



export default router
