import {init} from './index';

const port = 3000;

init().app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);

})
