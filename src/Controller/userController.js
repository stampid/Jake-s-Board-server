import bcryptjs from "bcryptjs";
import { User } from "../../models/index";
import { sendMail, generateNumber } from "../lib/sendMail";

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

        res.status(200);
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

  const salt = bcryptjs.genSaltSync(10);
  password = bcryptjs.hashSync(password, salt);

  User.create({ email, nickName, password, provider, profileImg })
    .then(_ => {
      res.status(200);
      res.send(true);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};
