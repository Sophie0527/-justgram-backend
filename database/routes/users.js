const express = require('express');

const {signupController,loginController} = require('../controllers/user')

const router = express.Router();

router.post('/users/signup', signupController);

router.post('/users/login', loginController);


// 로그인 성공한 후, client는 request header에 토큰을 담아 또다른 요청을 보냅니다.
// request header에 담겨 있는 jwt를 검증하는 API를 생성합니다.
// 토큰을 입력한 유저의 정보를 request body에 객체로 반환 
router.get('/users/verification',  async (req, res) => {

    res.json({  });
});

module.exports  = router;