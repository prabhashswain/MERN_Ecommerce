const jwt = require('jsonwebtoken');

class Authorization{
    authorized(req,res,next){
        const headerToken = req.headers.authorization
        if (headerToken) {
            const token = headerToken.split('Bearer ')[1]
            const verified = jwt.verify(token,process.env.SECRET_KEY);
            if (verified) {
                next();
            } else {
                return res.status(401).json({errors:[{'msg':'Invalid Token'}]})
            }
        } else {
            return res.status(401).json({errors:[{'msg':'Token is missing'}]})
        }
    }
}

module.exports = new Authorization();