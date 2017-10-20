* receives:
    * image:
        * type: object
        * properties:
            * imageurl: string
            * upvotes: number
            * downvotes: number
            * _id: object

* form:
    * method: POST
    * elements (2):
        * submit: 
            * name: "vote"
            * value "up"
        * submit:
            * name: "vote"
            * value: "down"