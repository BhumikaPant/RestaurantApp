const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will give you all the promotion details!!');
})
.post((req, res, next) => {
    res.end(`Will upload the promotion: ${req.body.name} with details ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported!!!');
})
.delete((req, res, next) => {
    res.end('Deleting all the promotion details!!!');
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end(`Will give you details of the promotion ${req.params.promoId}`);
})
.post((req, res, next) => {
    res.statusCode = 403
    res.end(`POST method not supported!!!`);
})
.put((req, res, next) => {
    res.write(`Updating the details of the promotion ${req.params.promoId} \n`)
    res.end(`Will update the promotion ${req.body.name} with the details ${req.body.description}`);
})
.delete((req, res, next) => {
    res.end(`Deleting the promotion ${req.params.promoId}`);
});

module.exports = promoRouter;