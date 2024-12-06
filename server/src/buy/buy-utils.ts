import nodemailer from 'nodemailer';

// Create a transporter using SMTP 
// with the provided email service, email, and password 
// from the environment variables.
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, 
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS     
    }
});

/**
 * Sends an email to the seller with buyer's details.
 * @param sellerEmail - The seller's email address.
 * @param buyerName - The buyer's name.
 * @param buyerEmail - The buyer's email address.
 */
export const sendPurchaseEmail = async (sellerEmail: string, buyerName: string, buyerEmail: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: sellerEmail,
        subject: 'New Purchase Notification',
        text: `Hello,

You have a new purchase!

Buyer Name: ${buyerName}
Buyer Email: ${buyerEmail}

Thank you for using Triton2Shop!

Best Regards,
Triton2Shop Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Purchase email sent to ${sellerEmail}`);
    } catch (error) {
        console.error('Error sending purchase email:', error);
        throw error;
    }
};