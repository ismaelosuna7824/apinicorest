import  expressApp from 'express';
import {index, showById, create, update, remove} from './controller';

const router = expressApp();
const baseURL = '/categories';


router.get(`${baseURL}`, index);

router.post(`${baseURL}`, create);

router.put(`${baseURL}/:id`, update);

router.delete(`${baseURL}/:id`, remove);

router.get(`${baseURL}/:id`, showById);




export default router;