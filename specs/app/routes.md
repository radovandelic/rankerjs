* requires:
    * express
    * body-pa-rser
    * ./logic
    * ./model

* routes:
    * "/"
        * method: get
        * req: none
        * behavior: renders index.ejs with all images

    * "/add"
        * method: get
        * req: none
        * behavior: renders add.ejs to add images

    * "/add"
        * method: post
        * req(1): req.body.imageurl
        * behavior: sends imageurl to model, rerenders index.ejs with objects from db