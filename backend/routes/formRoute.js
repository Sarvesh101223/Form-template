import express from 'express'
import { submitForm, getSubmissions, getFormById, getAllFormTypes, deleteForm } from "../controllers/formController.js";

const router = express.Router();

router.route('/submit/:formType').post(submitForm);

router.route('/submissions/:formType').get(getSubmissions)

router.route('/:formType/:id').get(getFormById)

router.route('/:formType/:id').delete(deleteForm)

router.route('/types').get(getAllFormTypes)

export default router;