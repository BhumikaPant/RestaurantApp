const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will give you all the leader\'s details!!');
})
.post((req, res, next) => {
    res.end(`Will upload the leader: ${req.body.name} with details ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported!!!');
})
.delete((req, res, next) => {
    res.end('Deleting all the leader\'s details!!!');
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end(`Will give you details of the leader ${req.params.leaderId}`);
})
.post((req, res, next) => {
    res.statusCode = 403
    res.end(`POST method not supported!!!`);
})
.put((req, res, next) => {
    res.write(`Updating the details of the leader ${req.params.leaderId} \n`)
    res.end(`Will update the leader ${req.body.name} with the details ${req.body.description}`);
})
.delete((req, res, next) => {
    res.end(`Deleting the leader ${req.params.promoId}`);
});

module.exports = leaderRouter;