import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddelware.js';
import { addComment, createProduct, deleteProduct, findProductsByCat, getAllProduct, getSIngleProduct, productPhoto, searchProduct, showProductByPages, similarProducts, updateProduct } from '../controllers/productController.js';
import Formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, Formidable(), isAdmin, createProduct);

router.put('/update-product/:proId', Formidable(), updateProduct);

router.get('/all-product', getAllProduct);

router.get('/single-product/:proSlug', getSIngleProduct);

router.get('/product-photo/:proId', productPhoto);

router.delete('/delete-product/:proId', deleteProduct);

router.post('/products-by-page', showProductByPages);

router.post('/search-product', searchProduct);

router.get('/similar-products/:pId/:cId', similarProducts);

router.post('/category-products/:slug', findProductsByCat);

router.post('/comments/:id', addComment);

export default router;