const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { config } = require('./../config/Config');

const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    //console.log('Token ',token);
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

         try{
         let verifiedUser=   jwt.verify(token, config.TOKEN_SECRET.user) 
         if (!verifiedUser) return res.status(401).send('Unauthorized request')
         req.user = verifiedUser; // user_id
         next();
        }
        // || jwt.verify(token, config.TOKEN_SECRET.admin); // add here or||  // config.TOKEN_SECRET => 'secretKey'
     
       // if (!verifiedUser) return res.status(401).send('Unauthorized request')
       catch{
        let verifiedUser=   jwt.verify(token, config.TOKEN_SECRET.admin) 
        if (!verifiedUser) return res.status(401).send('Unauthorized request')
        req.user = verifiedUser; // user_id
        next();
       }
     

    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Token");
    }

}

const verifyAdminToken = (req, res, next) => {
    let token = req.headers.authorization;
    //console.log('Token ',token);
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
try{

    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET.admin); // add here or||  // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send('Unauthorized request')

    req.user = verifiedUser; // user_id
    next();
}
catch{
    res.status(201).json({message: "you are not admin"})
}

    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Token");
    }

}
module.exports = {
    verifyUserToken,
    verifyAdminToken,
}