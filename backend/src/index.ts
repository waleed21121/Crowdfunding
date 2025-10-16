import express from 'express';
import cors from 'cors';
import { envVariables, logger } from './config';
import { DBConnect } from './models';
import { errorHandler, requestLogger } from './middlewares';
import { scheduler } from './utils';
import router from './routes';
import cookieParser from 'cookie-parser';

const app = express();

// Cookie parser middleware
app.use(cookieParser())

// Cors middleware
app.use(cors({
    origin: 'http://localhost:5173'
}))

// Json middleware
app.use(express.json());

// Logger middleware
app.use(requestLogger)

// App routers
app.use('/api', router);

// Error middleware
app.use(errorHandler);

DBConnect().then(() => {
    app.listen(envVariables.PORT, () => {
        console.log('Server is listening on port : ' + envVariables.PORT);
        logger.info('Successfully started the server')
        scheduler()
    })
})