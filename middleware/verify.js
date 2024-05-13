const jwt = require("jsonwebtoken");




exports.verifyToken = (req,res,next) =>{

    const token = req.cookies.authToken || null; 

    if (!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, "SECRETKEY", (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
      });

}

exports.logTime = (tag) => (req,res,next) =>{

    const now = new Date();
    console.log(`[${tag}] ${now.toLocaleString()}`); // Default locale and options
    next();

}