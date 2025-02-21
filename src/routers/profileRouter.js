// import express from 'express';
// import profileController from '../app/controllers/profileController.js';

// const router = express.Router();

// // newController.index
// router.use('/', profileController.index);

// export default router;
import express from 'express';
import ProfileController from '../app/controllers/ProfileController.js';

const router = express.Router();;
router.get('/', ProfileController.index);
router.get('/:id', ProfileController.getProfile);
router.put('/:id', ProfileController.updateProfile);


export default router;

