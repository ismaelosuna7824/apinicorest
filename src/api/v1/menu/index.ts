import expressApp from 'express';
import {menu} from "./controller";

const router = expressApp();

const baseURL = '/menu';

router.get(`${baseURL}`, menu);

export default router;