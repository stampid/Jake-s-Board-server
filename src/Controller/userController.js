import { User } from "../../models/index";
import { sendMail, generateNumber } from "../lib/sendMail";

const emailStorage = {};

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
