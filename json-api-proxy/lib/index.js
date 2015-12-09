import express from 'express';
import request from 'request';
import read from 'read-file';

import conftalk2jsonapi from './conftalk2jsonapi';

const app = express();

app.set('port', 3000);

app.get('/conftalk2jsonapi', (req, res) => {
  request(req.query.url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      body = conftalk2jsonapi(JSON.parse(body));
      res.send(body);
    }
  });
});

app.get('/conftalk.json', (req, res) => {
  read('./conftalk.json', (err, buffer) => {
    res.send(buffer.toString());
  });
});

app.listen(app.get('port'));
