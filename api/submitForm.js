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
  <table width="100%" cellspacing="0" cellpadding="0" style="font-family: 'Arial', sans-serif; color: #000000;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ca8831; border-radius: 10px; overflow: hidden;">
          <tr>
            <td align="center" style="padding: 20px 10px 10px;">
              <h1 style="font-size: 24px; font-weight: bold; text-decoration: underline; margin: 0;">New Quote Request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 20px 20px;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="padding: 16px 20px; background-color: #f5f5f5;">
                    <h2 style="font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0;">Personal Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; font-weight: bold; width: 40%;">Name:</td>
                  <td style="padding: 12px 20px;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; font-weight: bold;">Email:</td>
                  <td style="padding: 12px 20px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; font-weight: bold;">Phone:</td>
                  <td style="padding: 12px 20px;">${phone}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 20px; background-color: #f5f5f5;">
                    <h2 style="font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0;">Service Details</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; font-weight: bold;">Service:</td>
                  <td style="padding: 12px 20px;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; font-weight: bold;">Property Type:</td>
                  <td style="padding: 12px 20px;">${propertyType}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; font-weight: bold;">Additional Information:</td>
                  <td style="padding: 12px 20px;">${
                    additionalInfo || "N/A"
                  }</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
