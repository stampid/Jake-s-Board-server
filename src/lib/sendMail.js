import nodeMailer from "nodemailer";

const { GMAIL, MAILPASS } = process.env;

const transport = {
  service: "gmail",
  auth: {
    user: GMAIL,
    pass: MAILPASS
  }
};

export const generateNumber = () => {
  const randNum = Math.floor(Math.random() * 10000);
  return randNum;
};

export const sendMail = (email, randNum) => {
  const mailtransport = nodeMailer.createTransport(transport);

  const options = {
    from: "jake@gmail.com",
    to: email,
    subject: "email Auth",
    html: `signUp email number ${randNum}`
  };

  return new Promise((resolve, reject) => {
    mailtransport.sendMail(options, (err, _) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
