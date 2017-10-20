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

    * "/random"
        * method: get
        * req: none
        * behavior: redirects to a page id randomly generated using logic.randomid()

    * "/:id"
        * method: get
        * req: req.params.id
        * behavior: renders an image with the specified id and up/downvote buttons

    * "/:id"
        * method: get
        * req: req.params.id, req.body.vote (value == "up"||"down")
        * behavior: increments upvote or downvote counter, stores change in mongodb

    * "/ranked"
        * method: get
        * req: none
        * behavior: gets images from database, creates a sorted images object using logic.sort() and sends the sorted images object to ranked.ejs
        * sends: ranked_images