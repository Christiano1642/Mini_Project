import dotenv from "dotenv";

dotenv.config();

export default {
port: process.env.PORT || 3000,
db: {
    clientURL: process.env.DB_CLIENT_URL,
    name: "sample_airbnb",
    collection: "listingsAndReviews"
},
};