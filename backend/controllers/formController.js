import { getOrCreateModel } from '../models/form.js';
import { sendThankYouEmail, sendAdminEmail } from '../config/emailService.js';

// Submit form (any form type)
export const submitForm = async (req, res) => {
  try {
    const formType = req.params.formType;
    const formData = req.body;

    console.log(formData)
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

    sendThankYouEmail(formType, formData);
    sendAdminEmail(formType, formData);

    res.json({
      success: true,
      message: `${formType} form saved! 🎉`,
      data: {
        id: saved._id,
        collection: FormModel.collection.name
      }
    });

  } catch (error) {
    console.log('Error:', error.message);
    res.json({
      success: false,
      message: 'Something went wrong'
    });
  }
};

// Get all submissions for a form type
export const getSubmissions = async (req, res) => {
  try {
    const formType = req.params.formType;
    const { page = 1, limit = 20 } = req.query;
    
    console.log(`📊 Getting ${formType} submissions`);

    const FormModel = getOrCreateModel(formType, {});
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const submissions = await FormModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await FormModel.countDocuments();

    console.log(`✅ Found ${submissions.length} ${formType} submissions`);

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
    console.log('Error:', error.message);
    res.json({
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
      return res.json({
        success: false,
        message: 'Form not found'
      });
    }

    console.log(`✅ Found ${formType} form: ${form._id}`);

    res.json({
      success: true,
      formType,
      data: form
    });

  } catch (error) {
    console.log('Error:', error.message);
    res.json({
      success: false,
      message: 'Error getting form'
    });
  }
};

// Get all form types and their counts
export const getAllFormTypes = async (req, res) => {
  try {
    console.log('📊 Getting all form types');

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

    console.log(`✅ Found ${formTypes.length} form types`);

    res.json({
      success: true,
      formTypes,
      total: formTypes.length
    });

  } catch (error) {
    console.log('Error:', error.message);
    res.json({
      success: false,
      message: 'Error getting form types'
    });
  }
};

// Delete a form by ID (bonus method!)
export const deleteForm = async (req, res) => {
  try {
    const { formType, id } = req.params;
    
    console.log(`🗑️ Deleting ${formType} form with ID: ${id}`);

    const FormModel = getOrCreateModel(formType, {});
    const deleted = await FormModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({
        success: false,
        message: 'Form not found'
      });
    }

    console.log(`✅ Deleted ${formType} form: ${id}`);

    res.json({
      success: true,
      message: 'Form deleted successfully',
      deletedId: id
    });

  } catch (error) {
    console.log('Error:', error.message);
    res.json({
      success: false,
      message: 'Error deleting form'
    });
  }
};
