import  expressApp from 'express';

import {index, showById, create, update, remove} from './controller';

const router = expressApp();

const baseURL = '/items';

router.get(`${baseURL}`, index);
router.get(`${baseURL}/:id`, showById);
router.post(`${baseURL}`, create);
router.put(`${baseURL}/:id`, update);
router.delete(`${baseURL}/:id`, remove);

export default router;

