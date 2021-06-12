const express = require('express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
