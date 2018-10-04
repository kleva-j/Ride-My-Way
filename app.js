import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import jsend from 'jsend';
import cors from 'cors';
import expressValidator from 'express-validator';
import routers from './server/routes/index';

const app = express();

app.use(express.static(path.join(__dirname, '/template')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsend.middleware);
app.use(cors());

if (process.env.NODE_ENV !== 'TEST') {
  app.use(logger('dev'));
}

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('-');
    const root = namespace.shift();
    let formParam = root;
    while (namespace.length) {
      formParam += `[ ${namespace.shift()} ]`;
    }
    return { param: formParam, msg, value };
  }
}));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Ride-My-Way Api');
});

routers(app);

// Handle 404
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'template', '404.html'));
  next();
});

// Handle Errors
app.use((err, req, res) => {
  console.error('An application error has occurred:');
  console.error(err.stack);
  res.status(500).jsend.error({ message: 'page not found' });
  res.sendFile(path.join(__dirname, 'template', '500.html'));
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
