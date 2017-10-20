* receives: 
    * images:
        * type: object
        * properties:
            * rank:   // (0,1, 2, 3 etc.)
                * type: object
                * properties:
                    * imageurl: string
                    * upvotes: number
                    * downvotes: number
                    * _id: object

* links/buttons:
    * /random
    * /:_id
    * /

* behavior: display index page, but with images sorted by rank