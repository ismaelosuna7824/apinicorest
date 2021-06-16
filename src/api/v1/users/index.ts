import  expressApp from 'express';

import {index, create, update, remove} from './controller';

const router = expressApp();

const baseURL = '/users';

router.get(`${baseURL}`, index);
router.post(`${baseURL}`, create);
router.put(`${baseURL}/:id`, update);
router.delete(`${baseURL}/:id`, remove);

export default router;
