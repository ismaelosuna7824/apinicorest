import {init} from './index';

const port = 8080;

init().app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);

})
