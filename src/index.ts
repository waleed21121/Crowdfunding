import express from 'express';
import { envVariables, logger } from './config';
import { DBConnect } from './models';
import { errorHandler, requestLogger } from './middlewares';

const app = express();
app.use(express.json());

// Logger middleware
app.use(requestLogger)

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
        logger.info('Successfully started the server')
    })
})