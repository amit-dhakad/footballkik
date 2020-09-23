const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const users = require('./controllers/users');
container.resolve((users) => {
  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(5000, () => console.log(`Server is running on port 5000`));

    ConfigureExpress(app);
    //   Setup router
    const router = require('express-promise-router')();
    users.SetRouting(router);
    app.use(router);
  }

  function ConfigureExpress(app) {
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }
});

/* app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ msg: 'Success' });
});
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
 */
