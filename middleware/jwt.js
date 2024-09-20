import jwt from "jsonwebtoken"

const jwtAuthMiddleware = (req, res, next) => {

    // first check the request header has authorized for not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error : "token not found"})
    // extract the jwt token from request header

   //  const token = req.header.authorization.split(" ")[1];
    // if (!token) return res.status(401).json({ error: 'unauthorized' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRECT)
        req.user = decoded
        //can be used ther  req.jwtplayload
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid Toekn" })
    }
}

const generatetoken = (userData) => {
    const secret_key = process.env.JWT_SECRECT || "12345"
    return jwt.sign(userData, secret_key,{expiresIn : 3000000})
}
export { jwtAuthMiddleware, generatetoken }