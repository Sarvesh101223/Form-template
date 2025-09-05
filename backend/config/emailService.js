import nodemailer from 'nodemailer';

// Simple email sender
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Simple thank you email - works for ANY form type
export const sendThankYouEmail = async (formType, formData) => {
  try {
    // Skip if no email provided
    if (!formData.email) return;

    // Simple email content that works for any form
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4CAF50;">Hello ${formData.name || 'there'}! 👋</h2>
        <p>Thank you for submitting the <strong>${formType}</strong> form! ✅</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>We have received your information and will get back to you soon.</strong></p>
          <p>Form Type: <strong>${formType.toUpperCase()}</strong></p>
          <p>Submitted: ${new Date().toLocaleString()}</p>
        </div>
        <p>Best regards,<br>
        <strong>${process.env.COMPANY_NAME || 'Our Team'}</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || 'Dynamic Forms'}" <${process.env.EMAIL_FROM}>`,
      to: formData.email,
      subject: `✅ Thank You - ${formType} Form Received!`,
      html: message
    });

    console.log(`✅ Thank you email sent to ${formData.email}`);
  } catch (error) {
    console.log(`⚠️ Email failed (form still saved):`, error.message);
  }
};

// Simple admin notification
export const sendAdminEmail = async (formType, formData) => {
  try {
    // Create a nice list of submitted data
    let dataList = '';
    Object.keys(formData).forEach(key => {
      dataList += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${formData[key]}</li>`;
    });

    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #f44336;">🔔 New ${formType.toUpperCase()} Form Submission</h2>
        <p>Someone just submitted a ${formType} form on your website!</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>📋 Submitted Data:</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${dataList}
          </ul>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p>Please check your admin panel to review and respond to this submission.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Website Notification" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM, // Send admin notification to yourself
      subject: `🔔 New ${formType.toUpperCase()} Form Submission!`,
      html: message
    });

    console.log(`✅ Admin notification sent for ${formType}`);
  } catch (error) {
    console.log(`⚠️ Admin email failed:`, error.message);
  }
};
