import express, { Application, json } from 'express';
import userRouter from './components/users/user-routes';

const port = 5000;
const app: Application = express();

app.use(json());
app.use('/users', userRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
