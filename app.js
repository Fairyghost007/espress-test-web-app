var express = require('express');
const app = express();
const path = require('path');

var indexRouter = require('./routes/index');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

function checkWorkingHours(req, res, next) {
  const date = new Date();
  const day = date.getDay(); 
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); 
  } else {
    res.status(403).render('notAvailable', { title: 'Unavailable' });
  }
}

app.use(checkWorkingHours);
app.use('/', indexRouter);

app.listen(5000);




