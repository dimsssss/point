const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');
const pointsRouter = require('./routes/points');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/v1/points', pointsRouter);

module.exports = app;
