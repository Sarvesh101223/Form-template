import mongoose from 'mongoose';

// Cache to store created models 
const modelCache = {};

// Create or get models
export const getOrCreateModel = (formType, formData) => {
  const modelName = `${formType}Form`;
  
  // Return existing model if already created
  if (modelCache[modelName]) {
    return modelCache[modelName];
  }

  // Schema that accepts any fields
  const schema = new mongoose.Schema({}, {
    strict: false,        // ✅ Accept any fields!
    timestamps: true      // ✅ Auto createdAt/updatedAt
  });

  // Create and cache the model
  const model = mongoose.model(modelName, schema);
  modelCache[modelName] = model;
  
  console.log(`✅ Created new collection: ${modelName.toLowerCase()}s`);
  return model;
};
