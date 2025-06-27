import express from 'express';
import { userRegestration, userLogin, listAllUsers, fetchSingleUser } from '../controller/userController.js';
import { verifyToken } from '../middlewares/middlewares.js';
const router = express.Router();

router.post('/users/regestration', userRegestration);
router.post('/users/login', userLogin);
router.get('/users/all', verifyToken, listAllUsers);
router.get('/users/:id', verifyToken, fetchSingleUser);

export default router;