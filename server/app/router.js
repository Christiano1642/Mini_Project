import Router from "express";
import config from "./config.js";
import client from "./db/client.js";



const router = new Router ();

router.get("/", (_, res) =>{
    res.send("Hello from API");
});

router.get("/listings", async (req, res) =>{
    const currentListings = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .find( {$or:[
        {name: {$regex: (req.body.keywords? req.body.keywords: ""), $options: "i"}},
        {description:{ $regex:(req.body.keywords? req.body.keywords: ""), $options: "i"}},
    ]})
    .limit(req.query.limit? req.query.limit: 0)
    .toArray();

    res.json(currentListings);
})

router.get("/review/:id", async (req, res) => {
   const listingId = await client
   .db(config.db.name)
   .collection(config.db.collection)
   .findOne({_id: req.params.id})
   .toArray();

   res.json(listingId);
})

export default router;