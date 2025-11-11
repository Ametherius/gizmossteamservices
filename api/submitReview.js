import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end("Method not allowed");
  }
  if (!req.body) {
    res.statusCode = 400;
    return res.end("Missing request body");
  }

  const { name, email, rating, review } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Name: </strong>${name}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Email: </strong>${email}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Rating: </strong>${rating}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Review: </strong>${review}</p>
    `;

  const mailOptions = {
    from: `Gizmo's Steam Services <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Review",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ success: false, message: "Error sending email" });
    } else {
      res.statusCode = 200;
      return res.json({ success: true, message: "Review sent successfully!" });
    }
  });
}
