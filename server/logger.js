// This code is published under GNU GPL v3.0 License. Copyright 2023 404: Name Not Found (Liskov)
function logger(req, res, next) {
    console.log(req.method, req.originalUrl);
    next();
}

module.exports = logger;
