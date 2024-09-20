import jsonwebtoken from "jsonwebtoken"

const jwtAuthMiddleware = (req, res, next) => {
    // extract the jwt token from request header
    const token = req.header.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'unauthorized' })

    try {
    const decoded =  jwt.verify(token,process.env.JWT_SECRECT)
    req.user = decoded
  //cna be used ther  req.jwtplayload
    next();

    } catch (error) {
     console.log(error);
     res.status(401).json({error : "Invalid Toekn"})
    }
}

const generatetoken = (userData) => {
    return jwt.sign(userData,process.env.JWT_SECRECT)
}
export  {jwtAuthMiddleware ,generatetoken}