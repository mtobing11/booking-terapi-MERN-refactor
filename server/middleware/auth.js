import jwt from 'jsonwebtoken';

// if user want to like a post
// click the like button --> auth middleware (next) --> like controller ...
// artinya jika auth middleware udah berkata next, artinya kita boleh lanjut melakukan kegiatan kita yaitu menjalankan function contoller like

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.TOKEN);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;