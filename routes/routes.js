import express from 'express';
import { userRegestration, userLogin } from '../controller/userController.js';
const router = express.Router();

router.post('/users/regestration', userRegestration);
  
export default router;