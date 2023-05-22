import express from 'express';
import searchRoutes from './routes/movies.routes';
import cors from 'cors';
import { config } from './config/config';

const app = express();
const port = config.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api/movies', searchRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});