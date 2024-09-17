import mongoose from "mongoose";
import bcrypt from "bcrypt"
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "owner"],

    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }


}, { timestamps: true })

personSchema.pre('save', async function (next) {
    const person = this;

    // hashed the passport only if ot has modified (or its new )
    if (!person.isModified('password')) return next()
    try {
        // hashed the password
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)

        // override the plain password with hashed one
        person.password = hashedPassword;
        next();
    } catch (error) {
        console.log("error in pre personschema",error)
    }

})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log("error in comparepassword",error)
    }
}

// dinesh -------> ugug44982hhru2iu23
// login ------------->Verma
// ugug44982hhru2iu23 ------> extract salt
// salt + verma -->hash ------> heebfhoi8402390532
//then compare(ugug44982hhru2iu23 == heebfhoi8402390532 )



const Person = mongoose.model('Person', personSchema)

export default Person