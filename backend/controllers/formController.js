import mongoose from 'mongoose';
import { getOrCreateModel } from '../models/form.js';
import { sendThankYouEmail, sendAdminEmail } from '../config/emailService.js';

export const submitForm = async (req, res) => {
  try {
    const formType = req.params.formType;
    const formData = req.body;

    console.log(`📝 Got ${formType} form with fields: ${Object.keys(formData).join(', ')}`);

    if (!formData || Object.keys(formData).length === 0) {
      return res.json({
        success: false,
        message: 'Please send some data'
      });
    }

    const FormModel = getOrCreateModel(formType, formData);
    const saved = await FormModel.create(formData);
    
    console.log(`✅ Saved to ${FormModel.collection.name} collection`);

    // Email sending with individual error handling
    console.log('🔄 Starting email sending process...');
    
    let emailResults = {
      userEmail: { success: false, error: null },
      adminEmail: { success: false, error: null }
    };

    // Send user email
    try {
      const userResult = await sendThankYouEmail(formType, formData);
      emailResults.userEmail = userResult;
      console.log('✅ User email processed');
    } catch (userEmailError) {
      console.error('⚠️ User email failed:', userEmailError.message);
      emailResults.userEmail = { success: false, error: userEmailError.message };
    }

    // Send admin email
    try {
      const adminResult = await sendAdminEmail(formType, formData);
      emailResults.adminEmail = adminResult;
      console.log('✅ Admin email processed');
    } catch (adminEmailError) {
      console.error('⚠️ Admin email failed:', adminEmailError.message);
      emailResults.adminEmail = { success: false, error: adminEmailError.message };
    }

    // Determine overall email status
    const emailsSuccessful = emailResults.userEmail.success || emailResults.adminEmail.success;
    
    res.json({
      success: true,
      message: `✅ ${formType} form saved! ${emailsSuccessful ? '📧 Emails sent!' : '⚠️ Email issues - check logs'}`,
      data: {
        id: saved._id,
        collection: FormModel.collection.name,
        emailStatus: emailResults
      }
    });

  } catch (error) {
    console.error('❌ Form submission error:', error.message);
    console.error('🔍 Full error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Something went wrong with form submission'
    });
  }
};

// Get all submissions for a form type
export const getSubmissions = async (req, res) => {
  try {
    const formType = req.params.formType;
    const { page = 1, limit = 20 } = req.query;
    
    console.log(`Getting ${formType} submissions`);

    const FormModel = getOrCreateModel(formType, {});
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const submissions = await FormModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FormModel.countDocuments();

    console.log(`Found ${submissions.length} ${formType} submissions`);

    res.json({
      success: true,
      formType,
      collection: FormModel.collection.name,
      data: submissions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total
      }
    });

  } catch (error) {
    console.error('❌ Get submissions error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error getting submissions'
    });
  }
};

// Get specific form by ID
export const getFormById = async (req, res) => {
  try {
    const { formType, id } = req.params;
    
    console.log(`🔍 Getting ${formType} form with ID: ${id}`);

    const FormModel = getOrCreateModel(formType, {});
    const form = await FormModel.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    console.log(`Found ${formType} form: ${form._id}`);

    res.json({
      success: true,
      formType,
      data: form
    });

  } catch (error) {
    console.error('❌ Get form by ID error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error getting form'
    });
  }
};

// Get all form types and their counts
export const getAllFormTypes = async (req, res) => {
  try {
    console.log('Getting all form types');

    // Get all collections from database
    const collections = await mongoose.connection.db.listCollections().toArray();
    const formCollections = collections.filter(col => col.name.includes('form'));

    const formTypes = await Promise.all(
      formCollections.map(async (collection) => {
        const count = await mongoose.connection.db.collection(collection.name).countDocuments();
        const formType = collection.name.replace('forms', '').toLowerCase();
        return {
          formType,
          collection: collection.name,
          count
        };
      })
    );

    console.log(`Found ${formTypes.length} form types`);

    res.json({
      success: true,
      formTypes,
      total: formTypes.length
    });

  } catch (error) {
    console.error('❌ Get all form types error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error getting form types'
    });
  }
};

// Delete a form by ID
export const deleteForm = async (req, res) => {
  try {
    const { formType, id } = req.params;
    
    console.log(`Deleting ${formType} form with ID: ${id}`);

    const FormModel = getOrCreateModel(formType, {});
    const deleted = await FormModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    console.log(`Deleted ${formType} form: ${id}`);

    res.json({
      success: true,
      message: 'Form deleted successfully',
      deletedId: id
    });

  } catch (error) {
    console.error('❌ Delete form error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting form'
    });
  }
};
