import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Person from "../models/person.model.js";




passport.use(new LocalStrategy(
    async (USERNAME, password, done) => {
        try {
            console.log('Recevied credentials : ', USERNAME, password)
            const user = await Person.findOne({ username: USERNAME });
            if (!user) {
                return done(null, false, { message: 'Incorrect Username' })
            }

            const isPasswordMatch = user.password === password ? true : false;
            if (isPasswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect Password" })
            }

        } catch (error) {
            return done(error);
        }
        
    }
))

// app.use(passport.initialize());

const Authenticationmiddleware = passport.authenticate('local', {session : false})
export default Authenticationmiddleware