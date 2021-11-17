import Router from "express";
import config from "./config.js";
import client from "./db/client.js";



const router = new Router ();

router.get("/", (_, res) =>{
    res.send("Hello from API");
});

// route for finding words that match name and description.
router.get("/listings", async (req, res) =>{
    const currentListings = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .find( {$or:[
        {name: {$regex: (req.body.keywords? req.body.keywords: ""), $options: "i"}},
        {description:{ $regex:(req.body.keywords? req.body.keywords: ""), $options: "i"}},
    ]})
    .max({$max:{price: req.query.price? req.query.price: 0}})
    .limit(req.query.limit? req.query.limit: 0)
    .toArray();

    res.json(currentListings);
})

// Route to return all details of an id
router.get("/:id", async (req, res) => {
   const listingId = await client
   .db(config.db.name)
   .collection(config.db.collection)
   .findOne({_id: req.params.id})
   .toArray();

   res.json(listingId);
})

// Route to return only the review of a given id
router.get("/review/:id", async (req, res) => {
    const review = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .findOne({_id: req.params.id})
    
    res.json(review.review);
})

// Route to post a review
router.post("/review/:id", async (req, res) => {
    const listing = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .updateOne(
        {_id: req.params.id},
        {$push:{reviews: req.body}})

        res.json(listing);
})

// Route to insert a new listing
router.post("/review/:id/", async (req, res) => {
    const insertListing = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .insertOne(req.body)

    res.json(insertListing);
})

// Delete a listing
router.delete("/listing/:id", async (req, res) => {
    const deleteListing = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .deleteOne({_id: req.params.id})

    res.json(deleteListing);
})

// Update a listing
router.put("/listing/", async (req, res) => {
    const updateListing = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .updateOne({_id: req.params.id})

    res.json(updateListing);
})

// Delete a review
router.delete("/review/:id", async (req, res) => {
    const deleteReview = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .deleteOne({_id: req.params.id},
        {$pull:{rewiews: req.body}})
    
        res.json(deleteReview);
})

// Update a review
router.put("/review/", async (req, res) =>{
    const updateReview = await client
    .db(config.db.name)
    .collection(config.db.collection)
    .updateOne({_id: req.params.id},
        {$set:{rewiews: req.body}})

        res.json(updateReview);
})
export default router;