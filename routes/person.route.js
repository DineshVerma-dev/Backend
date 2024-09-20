
import { Router } from 'express';
import Person from '../models/person.model.js';
import { jwtAuthMiddleware, generatetoken } from '../middleware/jwt.js';

const router = Router()

router.route("/signup").post(async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log("response data saved ", data)

        const playload = {
            id: response.id,
            username: response.username
        }

        const token = generatetoken(playload)
        console.log("Toekn is : ", token)

        res.status(200).json({ response: response, token: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'intrtnal server error' })
    }
})
// login route 
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const User = await Person.findOne({ username: username });
        if (!User || !(await User.comparePassword(password))) {
            return res.status(401).json({ error: "invalid username or password" })
        }
        //generate token
        const playload = {
            id: User.id,
            username: User.username
        }
        const token = generatetoken(playload)
       // res.json({token : token})
        res.json(token)
    } catch (error) {
        console.log("error in person routes", error)
        res.status(200).json({ error: "internal server eroror" })
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

router.route("/:id").delete(middle, async (req, res) => {
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
