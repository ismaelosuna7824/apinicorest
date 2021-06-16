import expressApp from 'express';
import {login} from "./controller";

const router = expressApp();

router.post('/login', login);

export default router;