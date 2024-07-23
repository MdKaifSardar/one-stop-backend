import express from 'express'
import {registerController, loginController, testController, forgotPassController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddelware.js';
import Formidable from 'express-formidable';

const router = express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.get('/test',requireSignIn, isAdmin, testController);

router.post('/forgot-password', forgotPassController);

router.get('/user-auth',requireSignIn, (req, res) => {
    res.status(200).json({ok: true});
});
router.post('/admin-auth', requireSignIn, Formidable(), isAdmin, (req, res) => {
    res.status(200).json({ok: true});
});

export default router