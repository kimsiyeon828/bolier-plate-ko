const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증 처리를 하는 곳 

    // 1.클라리언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.w_auth;

    // 2.토큰을 복호화해서 userid를 찾는다
    User.findByToken(token, (err, user) => {
        // 3.유저가 있으면 인증 ok
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })
        // 4.유저가 없으면 인증 no
        req.token = token;
        req.user = user;
        next();
    })
    
    

}


module.exports = { auth };