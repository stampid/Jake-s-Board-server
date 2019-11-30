import bcryptjs from "bcryptjs";
import { User } from "../../models/index";
import { sendMail, generateNumber } from "../lib/sendMail";
import { createJWT } from "../middleware/jwtHelper";

const emailStorage = {};

// 이메일 중복 확인 및 인증번호 보내기
export const emailSend = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.status(400);
      res.send(false);
    } else {
      const randNum = generateNumber();
      const result = await sendMail(email, randNum);

      if (result) {
        emailStorage[email] = randNum;

        res.status(201);
        res.send(true);
      }
    }
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

// 인증번호 확인
export const emailAuth = (req, res) => {
  const { email, number } = req.body;

  if (emailStorage[email] === Number(number)) {
    delete emailStorage[email];

    res.status(200);
    res.send(true);
  } else {
    res.status(400);
    res.send(false);
  }
};

// 회원가입
export const signUp = (req, res) => {
  const {
    email,
    nickName,
    provider = "local",
    // Todo : 기본 imgUrl 교체하기
    profileImg = "imgUrl"
  } = req.body;
  let { password } = req.body;

  bcryptjs.genSalt(10, (_, salt) => {
    bcryptjs.hash(password, salt, (_, hash) => {
      password = hash;

      User.create({ email, nickName, password, provider, profileImg })
        .then(_ => {
          res.status(201);
          res.send(true);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
        });
    });
  });
};

// 로그인
export const signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then(userData => {
      bcryptjs.compare(password, userData.password, (err, result) => {
        if (result) {
          const token = createJWT({ email, password });

          res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
            signed: true
          });
          res.status(201);
          res.send(true);
        } else {
          res.status(400);
          res.send("Wrong password");
        }
      });
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};

// 로그아웃
export const signOut = (req, res) => {
  res.clearCookie("token");
  // Todo : 클라이언트 만들 때 로그인 페이지로 리다이렉트 걸기
  res.redirect("https://www.naver.com");
};
