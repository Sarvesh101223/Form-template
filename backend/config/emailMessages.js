export const getEmailMessages = () => ({
    contact: {
        user: {
            subject: `Thanks for Reaching Out! We'll Get Back to You`,
            message: `Thanks for contacting us! We will respond within 24 hours.`,
            to: null,
            replyTo: process.env.REPLY_TO || process.env.EMAIL_FROM
        },
        admin: {
            subject: `New Contact Form Submission`,
            message: `New contact form submission received.`,
            to: process.env.ADMIN_EMAIL_1 || process.env.EMAIL_FROM,
            cc: [process.env.ADMIN_EMAIL_2, process.env.ADMIN_EMAIL_3].filter(Boolean),
            bcc: process.env.ADMIN_EMAIL_4,
            replyTo: 'FORM_SUBMITTER_EMAIL'
        }
    },
    career: {
        user: {
            subject: `Application Received - We'll Review Your Profile`,
            message: `Thanks for your application! HR will review your profile shortly.`,
            to: null,
            replyTo: process.env.REPLY_TO || process.env.EMAIL_FROM
        },
        admin: {
            subject: `New Job Application Received`,
            message: `New job application received.`,
            to: process.env.ADMIN_EMAIL_1 || process.env.EMAIL_FROM,
            cc: [process.env.ADMIN_EMAIL_2, process.env.ADMIN_EMAIL_3].filter(Boolean),
            bcc: process.env.ADMIN_EMAIL_4,
            replyTo: 'FORM_SUBMITTER_EMAIL'
        }
    },
    feedback: {
        user: {
            subject: `Thank You for Your Valuable Feedback!`,
            message: `Thanks for your feedback! We appreciate your input.`,
            to: null,
            replyTo: process.env.REPLY_TO || process.env.EMAIL_FROM
        },
        admin: {
            subject: `New Customer Feedback Received`,
            message: `New customer feedback received.`,
            to: process.env.ADMIN_EMAIL_1 || process.env.EMAIL_FROM,
            cc: [process.env.ADMIN_EMAIL_2, process.env.ADMIN_EMAIL_3].filter(Boolean),
            bcc: process.env.ADMIN_EMAIL_4,
            replyTo: 'FORM_SUBMITTER_EMAIL'
        }
    },
    newsletter: {
        user: {
            subject: `Welcome to Our Newsletter Family!`,
            message: `Welcome to our newsletter! You can unsubscribe anytime.`,
            to: null,
            replyTo: process.env.REPLY_TO || process.env.EMAIL_FROM
        },
        admin: {
            subject: `New Newsletter Subscription`,
            message: `New newsletter subscription received.`,
            to: process.env.ADMIN_EMAIL_1 || process.env.EMAIL_FROM,
            cc: [process.env.ADMIN_EMAIL_2, process.env.ADMIN_EMAIL_3].filter(Boolean),
            bcc: process.env.ADMIN_EMAIL_4,
            replyTo: 'FORM_SUBMITTER_EMAIL'
        }
    }
});
