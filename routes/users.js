let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true

});


module.exports = function (app) {

    let route = app.route('/users');

    route.get((req, res) => {



        db.find({}).sort({ name: 1 }).exec((err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);

            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users: user
                })

            }

        });



        route.post((req, res) => {


            if (!app.utils.validator.user(app, req, res)) return false;


            db.insert(req.body, (err, user) => {

                if (err) {
                    app.utils.error.send(err, req, res);
                } else {
                    res.status(200).json(user);
                }

            })


        });

    });

    let adm = app.route('/users/adm')

    adm.post((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;


        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        })


    });




    /*
        adm.get((req, res) => {
    
    
            db.find({}).sort({ name: 1 }).exec((err, user) => {
    
                if (err) {
                    app.utils.error.send(err, req, res);
    
                } else {
    
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        users: user
                    })
    
                }
    
            });
        });
    */


    let routeId = app.route('/users/:nome');

    routeId.get((req, res) => {

        db.findOne({ nome: req.params.nome }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);


            } else if (res.status) {
                res.status(200).json(user)

            }


        });

    });




    routeId.put((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;


        db.update({ nome: req.params.nome }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);

            } else {
                res.status(200).json(req.body);
            }


        });

    });


    routeId.delete((req, res) => {

        db.remove({ nome: req.params.nome }, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);

            } else {
                res.status(200).json(req.params);
            }



        });
    });

};
