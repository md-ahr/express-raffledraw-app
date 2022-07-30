import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use([morgan('dev'), cors(), express.json()]);

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Success' });
});

app.use((req, res, next) => {
    const error = new Error('Resouce Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    return error.status && res.status(error.status).json({ message: error.message });
    res.status(500).json({ message: 'Something went wrong' });
});

app.listen(PORT, (error) => {
    error ? console.log(`App can not be started, ${error}`) : console.log(`App is successfully running at port: ${PORT}`);
});
