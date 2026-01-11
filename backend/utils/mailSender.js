    const nodemailer = require("nodemailer");
    require("dotenv").config();

    const mailSender = async (email, title, body) => {
    try {

        const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false, // TLS
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        });

        const info = await transporter.sendMail({
        from: `"StudyNotion" <${process.env.MAIL_USER}>`,
        to: email,
        subject: title,
        html: body,
        });

        return info;
    }
    catch (err) {
        console.error("Mail error:", err);
    }
    };

    module.exports = mailSender;
