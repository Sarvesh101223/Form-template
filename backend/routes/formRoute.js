import express from 'express'
import { submitForm, getSubmissions, getFormById, getAllFormTypes } from "../controllers/formController.js";

const router = express.Router();

router.route('/submit/:formType').post(submitForm);

router.route('/submissions/:formType').get(getSubmissions)

router.route('/form/:id').get(getFormById)

router.route('/types').get(getAllFormTypes)

export default router;