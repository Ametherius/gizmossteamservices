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

  const {
    firstName,
    lastName,
    email,
    phone,
    service,
    propertyType,
    additionalInfo,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Name: </strong>${firstName} ${lastName}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Email: </strong>${email}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Phone: </strong>${phone}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Service: </strong>${service}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Property Type: </strong>${propertyType}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Additional Information: </strong>${additionalInfo}</p>
  `;

  const mailOptions = {
    from: `Gizmo's Steam Services <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Quote Request",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ success: false, message: "Error sending email" });
    }

    res.statusCode = 200;
    return res.json({
      success: true,
      message: "Quote request sent successfully!",
    });
  });
}
