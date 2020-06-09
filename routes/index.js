module.exports = (app) => {
    app.get('/', (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'Text/html');
        res.end("<h1>Geral</h1>")

        console.log("URL:", req.url)
        console.log("METHOD:", req.method)


    });


};
