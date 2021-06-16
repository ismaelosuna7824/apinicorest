import expressApp from 'express';
import bodyParserApp from 'body-parser';

const app = expressApp();

import {authMiddleware} from './middlewares';
import categories from './api/v1/categories';
import items from './api/v1/items';
import users from './api/v1/users';
import menu from './api/v1/menu';
import auth from './api/v1/auth';

app.use(bodyParserApp.json());

app.use('/api/v1', [auth, menu]);
app.use('/api/v1', [authMiddleware], [categories, items, users])



// CODIGO A BORRAR

app.get('/', (req:any, res:any) => {
    res.json({
        success: true,
        message: 'Mi nombre es Nicolas'
    });
});

app.post('/nuevo', (req:any, res:any) => {
        res.json( {
            success: true,
            message: 'Recurso agregado'
        });

});

app.put('/actualizar', (req:any, res:any) => {
        res.json( {
            success: true,
            message: 'Recurso actualizar'
        });
});

app.delete('/eliminar', (req:any, res:any) => {
        res.json( {
            success: true,
            message: 'Recurso eliminado'
        });

});

export default app;