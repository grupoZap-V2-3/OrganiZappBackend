const admin = require('firebase-admin');

const getIdTokenFromHeaders = (headers) => {
    const { authorization = '' } = headers;
    const [, idToken = ''] = authorization.split('Bearer ');
    return idToken;
}

const validateToken = async (req, res, next) => {
    return next();  //Quitar esta linea de código cuando se haga el deploy
    const idToken = getIdTokenFromHeaders(req.headers);
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log(decodedIdToken);
        //firestore (uid)
        req.user = decodedIdToken;
        return next();
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        return next();
        // Remove previous line and Uncomment next line when ready to validate tokens
        // return res.status(403).send('Unauthorized');
    }
};

/*const isAdmin = (req, res, next) => {
    const { user } = req;
}*/

module.exports = {
    validateToken
}
