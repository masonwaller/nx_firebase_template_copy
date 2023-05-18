import express from 'express';
import { routes } from '../../server/src/routes';

const app = express();

app.use('/api/v0', routes())


export default app