const jwt = require("jsonwebtoken");


exports.verifyToken = (req,res,next) =>{


    const token = req.cookies.authToken || req.headers["authorization"] || null; 

    if (!token){

        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
      });

}

exports.logTime = (tag) => (req,res,next) =>{
    const now = new Date();
    console.log(`[${tag}] ${now.toLocaleString()}`); 
    next();
}


// Exporta una función llamada `logTime`
exports.logTime = function(tag) {
  // Esta función devuelve otra función middleware
  return function(req, res, next) {
    // Obtiene la fecha y hora actual
    const now = new Date();
    // Imprime en consola la etiqueta y la fecha/hora en formato local
    console.log('[' + tag + '] ' + now.toLocaleString());
    // Llama a `next()` para pasar el control al siguiente middleware
    next();
  };
};