require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserByEmail, createUser } = require('../models/user');
const { createError } = require('../module/createError');

const salt = bcrypt.genSaltSync();

async function signup(email,password) {

    if(!password.length > 8) {
        const error = createError('PASSWORD_TOO_SHORT',400);
        throw error;      
    }

    const user = await getUserByEmail(email);

    if(user) {
        const error = createError('EXSITING_USER',409);
        throw error;    
    }

    // bcrypt.hashSync : 단방향 암호화 (사용자 제외, 복호화를 할 필요없게 만드는 암호화)
    // hash(단방향 암호화) 라는 과정을 통해 암호화를 하게 되면, 
    // 나중에 로그인할 때 사용자가 입력한 정보를 단방향 암호화를 해서 DB에 저장된 암화화된 비번과 비교를 하게된다.
    const createUserDto = {
        email, 
        password:bcrypt.hashSync(password, salt)};

    await createUser(createUserDto);
}


async function login(email,password) {
    if(!email.includes('@')) {
        const error = createError('INVALID_EMAIL',400);
        throw error;           
    }

    if(!password.length > 8) {
        const error = createError('PASSWORD_TOO_SHORT',400);
        throw error;           
    }

    //1.user는 암호화된 비밀 번호 (user.password)
    //2.클라이언트가 브라우저에 입력한 비번 (pssword)
    //3. 1.과 2.번 비교(compareSync)
    //4. 같은면 로그인 성공 비번이 다르면 로그인 실패

    const user = await getUserByEmail(email);
    
    if (bcrypt.compareSync(password,user.password)) {
        // 로그인 성공
        // json web token 을 이용해서 클라이언트게 토큰을 넘겨준다.
        // 토큰을 넘길 떄 첫번째 매개변수에는 id(유저의정보를 식별할수 있는)를 담아서 보낸다.
        // 두번째 매개변수에는 시크릿키를 넣어준다. ( 시그니처부분을 확인할 떄 시크릿키를 이용해서 bcrypt와 같이 단방향 암호화를 하여 비교하게 된다.)
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY,{
            expiresIn:'1d'
        });
        console.log("token: ",token)

        // verify 하게되면 토큰을 복호화해서 페이로드랑 만료시간 { id: 10, iat: 1655419019, exp: 1655505419 }  확인 가능하다. 
        // iat: 만드는 시간, exp: 만료시간 [utc 기준]
        // 1d 이후에는 토큰을 사용할 수 없다. setTimeout을 걸어서 만료 후 1초뒤에 에러가 찍히도록 하였다.
        setTimeout (() => {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                console.log(decoded);
            }catch(err) {
                console.log(err);
            }
        },2000)

        return token;
    } else {
         // 로그인 실패
         // 비번이 다르기 때문에 에러를 내지만 ('password_not_same'과 같은 메세지를 줄 필요가 없음.)
         // 왜냐하면 그뜻은 이메일은 존재한다는 뜻이므로, 해커에게 이메일은 맞다는 정보를 주는게 되기 때문에!
        const error = createError('INVALID_USER',400)
        throw error;
    }
}

module.exports = { signup, login };