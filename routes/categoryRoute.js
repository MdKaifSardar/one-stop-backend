import express from 'express'
import { createCategory, deleteCategory, getAllCategory, singleCategory, updateCategory } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddelware.js';
import Formidable from 'express-formidable';

const router = express.Router();

router.post('/create-category', requireSignIn, Formidable(), isAdmin, createCategory);

router.put('/update-category/:catId', requireSignIn, Formidable(), isAdmin, updateCategory);

router.get('/all-category', getAllCategory);

router.get('/single-category/:catSlug', singleCategory);

router.delete('/delete-category/:catId', requireSignIn, Formidable(), isAdmin, deleteCategory);

export default router;