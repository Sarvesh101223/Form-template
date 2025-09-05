import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getEmailMessages } from './emailMessages.js';

// Load environment variables with error handling
const result = dotenv.config({ path: './config/config.env' });

if (result.error) {
  console.error('❌ Error loading config.env:', result.error.message);
  console.log('🔍 Make sure config.env exists at: ./config/config.env');
} else {
  console.log('✅ config.env loaded successfully');
}

// Debug function to check all environment variables
const debugEnvVars = () => {
  console.log('🔍 Environment Variables Check:');
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'MISSING');
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT || 'MISSING');
  console.log('EMAIL_USER:', process.env.EMAIL_USER || 'MISSING');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'MISSING');
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'MISSING');
  console.log('ADMIN_EMAIL_1:', process.env.ADMIN_EMAIL_1 || 'MISSING');
  console.log('ADMIN_EMAIL_2:', process.env.ADMIN_EMAIL_2 || 'MISSING');
  console.log('ADMIN_EMAIL_3:', process.env.ADMIN_EMAIL_3 || 'MISSING');
  console.log('ADMIN_EMAIL_4:', process.env.ADMIN_EMAIL_4 || 'MISSING');
};

debugEnvVars();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
});

// Test connection
const testConnection = async () => {
  try {
    console.log('🔄 Testing email connection...');
    const isReady = await transporter.verify();
    if (isReady) {
      console.log('✅ Email server is ready to send messages');
      console.log('📧 Using email:', process.env.EMAIL_USER);
    }
  } catch (error) {
    console.error('❌ Email connection failed:', error.message);
  }
};

testConnection();

//  formatEmails function
const formatEmails = (emails) => {
  console.log('🔍 formatEmails input:', emails, 'Type:', typeof emails);
  
  if (!emails) {
    console.log('📧 No emails provided');
    return undefined;
  }
  
  if (Array.isArray(emails)) {
    const cleanEmails = emails.filter(email => {
      if (!email || typeof email !== 'string') return false;
      const trimmed = email.trim();
      const isValid = trimmed.length > 0 && trimmed.includes('@') && trimmed.includes('.');
      console.log(`📧 Email "${email}" -> "${trimmed}" is valid: ${isValid}`);
      return isValid;
    });
    
    console.log('📧 Clean emails array:', cleanEmails);
    return cleanEmails.length > 0 ? cleanEmails : undefined;
  }
  
  if (typeof emails === 'string') {
    const trimmed = emails.trim();
    const isValid = trimmed.length > 0 && trimmed.includes('@') && trimmed.includes('.');
    console.log('📧 String email validation:', trimmed, 'Valid:', isValid);
    return isValid ? trimmed : undefined;
  }
  
  console.log('📧 Invalid email format - not string or array');
  return undefined;
};

// User Template:
const createUserEmailTemplate = (greeting, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Acknowledgment - ${process.env.COMPANY_NAME || 'Our Company'}</title>
    </head>
    <body>
        <div style="box-sizing: border-box; width: 100%; margin: 0; padding: 0; font-family: Roboto, sans-serif;">
            <div style="box-sizing: border-box; border-radius: 7px; overflow: hidden; max-width: 800px; width: 100%; background-color: ${process.env.EMAIL_BG_COLOR || '#F7F4EF'}; margin: auto;">
                
                <!-- Header with Logo -->
                <div style="box-sizing: border-box; border-radius: 7px; width: 100%; text-align: center; color: #fff; padding: 3rem 5%; background-color: ${process.env.HEADER_BG_COLOR || '#209147'};">
                    <img src="${process.env.LOGO_URL || 'https://via.placeholder.com/200x80?text=LOGO'}" style="max-width:200px;">
                </div>
                
                <!-- Main Content -->
                <div style="box-sizing: border-box; width: 100%; padding: 3rem 5%; color: #000;">
                    <div style="font-size: 15px; width: 100%;">
                        <p style="margin: 0; line-height: 1.4;">Hello <span style="font-weight: 600;">${greeting}</span>,</p>
                        <br>
                        <p style="margin: 0; line-height: 1.4;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${message}</p>
                        <br><br>
                        <p style="margin: 0; line-height: 1.4;">Best regards, <br> 
                        <span style="font-family: Georgia; font-size: 16px; font-weight: 600;">${process.env.COMPANY_NAME || 'Our Team'}</span></p>
                    </div>
                    <br><br>
                    
                    <!-- Contact Info -->
                    <div style="box-sizing: border-box; width: 100%; font-size: 15px;">
                        <p style="margin: 0; line-height: 1.4;"> <span style="font-weight: 600;">E:</span> <a style="text-decoration: none; color: ${process.env.HEADER_BG_COLOR || '#209147'};" href="mailto:${process.env.EMAIL_FROM}">${process.env.EMAIL_FROM}</a></p>
                        <p style="margin: 0; line-height: 1.4;"> <span style="font-weight: 600;">M:</span> <a style="text-decoration: none; color: ${process.env.HEADER_BG_COLOR || '#209147'};" href="tel:${process.env.CONTACT_NO}">${process.env.CONTACT_NO}</a></p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="box-sizing: border-box; border-radius: 7px; width: 100%; color: #fff; padding: 1rem 5%; background-color: ${process.env.HEADER_BG_COLOR || '#209147'};">
                    <p style="font-size: 12px; margin: 0;">This is a system generated Email.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

//Admin Template:
const createAdminEmailTemplate = (formType, dataTable) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${formType} Form Submission - ${process.env.COMPANY_NAME || 'Our Company'}</title>
    </head>
    <body>
        <div style="box-sizing: border-box; width: 100%; margin: 0; padding: 0; font-family: Roboto, sans-serif;">
            <div style="box-sizing: border-box; border-radius: 7px; overflow: hidden; max-width: 800px; width: 100%; background-color: ${process.env.EMAIL_BG_COLOR || '#F7F4EF'}; margin: auto;">
                
                <!-- Header with Logo -->
                <div style="box-sizing: border-box; border-radius: 7px; width: 100%; text-align: center; color: #fff; padding: 3rem 5%; background-color: ${process.env.HEADER_BG_COLOR || '#209147'};">
                    <img src="${process.env.LOGO_URL || 'https://via.placeholder.com/200x80?text=LOGO'}" style="max-width:200px;">
                </div>
                
                <!-- Main Content with Data Table -->
                <div style="box-sizing: border-box; width: 100%; padding: 3rem 5%; color: #000;">
                    <div style="font-size: 15px; width: 100%;">
                        
                        <!-- Data Table -->
                        <table style="text-align: left; width: 100%;" cellspacing="0" cellpadding="0">
                            ${dataTable}
                        </table>
                        
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="box-sizing: border-box; border-radius: 7px; width: 100%; color: #fff; padding: 1rem 5%; background-color: ${process.env.HEADER_BG_COLOR || '#209147'};">
                    <p style="font-size: 12px; margin: 0;">This is a system generated Email.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

const createDataTable = formData => {
  let tableRows = '';
  
  Object.keys(formData).forEach(key => {
    if (key !== 'status' && key !== '__v' && key !== '_id') {
      const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
      tableRows += `
        <tr>
            <td style="border-radius: 4px; background-color: #fbfbfb; padding: 15px;">${displayKey}</td>
            <td style="border-radius: 4px; background-color: #fbfbfb; padding: 15px;">${formData[key] || "N/A"}</td>
        </tr>
      `;
    }
  });

  tableRows += `
    <tr>
        <td style="border-radius: 4px; background-color: #fbfbfb; padding: 15px;">Submitted At</td>
        <td style="border-radius: 4px; background-color: #fbfbfb; padding: 15px;">${new Date().toLocaleString()}</td>
    </tr>
  `;
  
  return tableRows;
};

// Send Thank You Email
export const sendThankYouEmail = async (formType, formData) => {
  try {
    console.log('🔄 Starting thank you email process...');
    
    if (!formData.email) {
      console.log('⚠️ No email provided, skipping user email');
      return { success: false, reason: 'No email provided' };
    }

    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM environment variable not loaded');
    }

    // Get email messages with current env vars
    const emailMessages = getEmailMessages();
    const emailConfig = emailMessages[formType]?.user || emailMessages.contact.user;

    const emailHtml = createUserEmailTemplate(
      formData.name || formData.fullName || 'there',
      emailConfig.message
    );

    const mailOptions = {
      from: `"${process.env.COMPANY_NAME || 'Dynamic Forms'}" <${process.env.EMAIL_FROM}>`,
      to: formData.email,
      subject: emailConfig.subject,
      html: emailHtml,
      replyTo: emailConfig.replyTo || process.env.REPLY_TO || process.env.EMAIL_FROM
    };

    console.log('📬 Mail options for user:');
    console.log('  FROM:', mailOptions.from);
    console.log('  TO:', mailOptions.to);

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Thank you email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Thank you email failed:', error.message);
    throw error;
  }
};

//Send Admin Email
export const sendAdminEmail = async (formType, formData) => {
  try {
    console.log('🔄 Starting admin email process...');

    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM environment variable not loaded');
    }

    //Get email messages with current env vars  
    const emailMessages = getEmailMessages();
    const emailConfig = emailMessages[formType]?.admin || emailMessages.contact.admin;
    
    console.log('📧 Admin email config:', JSON.stringify(emailConfig, null, 2));
    
    //Verify admin email is properly set
    if (!emailConfig.to || emailConfig.to === process.env.EMAIL_FROM) {
      console.error('🚨 CRITICAL: Admin email not set properly!');
      console.error('🚨 ADMIN_EMAIL_1:', process.env.ADMIN_EMAIL_1);
      console.error('🚨 This will send admin email to user instead!');
    }
    
    const dataTable = createDataTable(formData);
    const emailHtml = createAdminEmailTemplate(formType, dataTable);

    const mailOptions = {
      from: `"${process.env.COMPANY_NAME || 'Website Notification'}" <${process.env.EMAIL_FROM}>`,
      to: emailConfig.to,
      subject: emailConfig.subject,
      html: emailHtml
    };

    //  CC processing
    if (emailConfig.cc && Array.isArray(emailConfig.cc) && emailConfig.cc.length > 0) {
      const ccEmails = formatEmails(emailConfig.cc);
      if (ccEmails) {
        mailOptions.cc = ccEmails;
        console.log('✅ CC emails set to:', ccEmails);
      }
    }

    //  BCC processing
    if (emailConfig.bcc) {
      const bccEmails = formatEmails(emailConfig.bcc);
      if (bccEmails) {
        mailOptions.bcc = bccEmails;
        console.log('✅ BCC emails set to:', bccEmails);
      }
    }

    // Smart reply-to processing
    if (emailConfig.replyTo === 'FORM_SUBMITTER_EMAIL' && formData.email) {
      mailOptions.replyTo = formData.email;
      console.log('📧 Reply-To set to form submitter:', formData.email);
    }

    console.log('📬 Final admin mail options:');
    console.log('  FROM:', mailOptions.from);
    console.log('  TO:', mailOptions.to);
    console.log('  CC:', mailOptions.cc || 'Not set');
    console.log('  BCC:', mailOptions.bcc || 'Not set');

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Admin email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    console.log('📨 Accepted recipients:', info.accepted);

    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Admin email failed:', error.message);
    throw error;
  }
};
