const express = require('express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const swtoolRouter = require('./routes/SwtoolRoute');

const app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/Swtool', swtoolRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
