import express from 'express';
import { envVariables } from './config';
import { DBConnect } from './models';
import { errorHandler } from './middlewares';

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
    res.send({
        msg: 'Hello, world!!!'
    })
});

// Error middleware
app.use(errorHandler);

DBConnect().then(() => {
    app.listen(envVariables.PORT, () => {
        console.log('Server is listening on port : ' + envVariables.PORT);
    })
})