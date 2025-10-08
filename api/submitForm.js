import nodemailer from 'nodemailer';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.statusCode = 405;
        return res.end('Method not allowed');
    }
    if (!req.body) {
        res.statusCode = 400;
        return res.end('Missing request body');
    }

    const { firstName, lastName, email, phone, service, propertyType, squareFootage, preferredDate, preferredTime, additionalInfo } = req.body;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlContent = `
    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <!-- Outer Container -->
                <table width="600px" cellspacing="0" cellpadding="0" border="2" style="background-color: #ca8831; border-radius: 10px; overflow: hidden;">
                    <!-- header -->
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <h1 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 24px; font-weight: bold; text-decoration: underline; padding: 10px;">New Quote Request</h1>
                                    </td>
                                </tr>
                                <!-- Body -->
                                 <tr>
                                    <td align="center">
                                        <h4 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-align: center;text-transform: uppercase;">Personal Information</h4>
                                    </td>
                                 </tr>

                                 <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">NAME:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${firstName} ${lastName}</p>
                                        <td style="padding: 20px;">
                                            <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">EMAIL:</h3>
                                            <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${email}</p>
                                        </td>
                                    </td>
                                 </tr>
                                 <tr>
                                    
                                 </tr>
                                 <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">PHONE:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${phone}</p>
                                    </td>
                                 </tr>

                                 <tr>
                                    <td align="center">
                                        <h4 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-align: center;text-transform: uppercase;">Service Details</h4>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">Service:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${service}</p>
                                        <td>
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">Property Type:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${propertyType}</p>
                                        </td>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">Approximat Square Feet:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${squareFootage}</p>
                                    </td>
                                   
                                 </tr>
                                 <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">Preffered Date:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${preferredDate}</p>
                                        <td>
                                            <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">Preffered Time:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${preferredTime}</p>
                                        </td>
                                    </td>
                                 </tr>
                                 <tr>
                                        <td style="padding: 20px;">
                                        
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-transform: uppercase;">Additional Information:</h3>
                                        <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${additionalInfo}</p>
                                    </td>
                                 </tr>
                            </table>
                        </td>
                    </tr>
  </table>
    `
    
    
    const mailOptions = {
        from: `Gizmo's Steam Services <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: 'New Quote Request',
        html: htmlContent,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.statusCode = 500;
            return res.json({ success: false, message: 'Error sending email' });
        } else {
            res.statusCode = 200;
            return res.json({ success: true, message: 'Quote request sent successfully!' });
        }
    });
}