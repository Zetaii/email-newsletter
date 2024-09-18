const nodemailer = require("nodemailer")
const hbs = require("nodemailer-handlebars")
const path = require("path")
require("dotenv").config()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "views"),
      layoutsDir: path.resolve(__dirname, "views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "views"),
    extName: ".handlebars",
  })
)

let mailOptions = {
  from: '"Your Company" <nguyens556@gmail.com>',
  to: "zerga556@yahoo.com",
  subject: "Welcome to Our Newsletter",
  template: "email-template",
  context: {
    firstName: "John",
    dynamicContent: "Here is some dynamic content based on your preferences.",
  },
  attachments: [
    {
      filename: "logo.png",
      path: path.join(__dirname, "images/logo.png"),
      cid: "logo",
    },
    {
      filename: "hero.jpg",
      path: path.join(__dirname, "images/hero.jpg"),
      cid: "hero",
    },
    {
      filename: "facebook.png",
      path: path.join(__dirname, "images/facebook.png"),
      cid: "facebook",
    },
    {
      filename: "twitter.png",
      path: path.join(__dirname, "images/twitter.png"),
      cid: "twitter",
    },
    {
      filename: "instagram.png",
      path: path.join(__dirname, "images/instagram.png"),
      cid: "instagram",
    },
  ],
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("Error sending email:", error)
  }
  console.log("Email sent: " + info.response)
})
