const express = require("express");
const router = express.Router();

module.exports = function (db) {
  router.get("/listings", async (req, res, next) => {
    try {
      const { location, propertyType, bedrooms, price } = req.query;
      const filter = {};

      // Apply filters only if location is provided
      if (location) {
        filter.$or = [
          { "address.market": { $regex: location, $options: "i" } },
          { "address.country": { $regex: location, $options: "i" } },
          { "address.street": { $regex: location, $options: "i" } },
          { "address.suburb": { $regex: location, $options: "i" } },
          { "address.country_code": { $regex: location, $options: "i" } },
        ];

        if (propertyType) {
          filter.property_type = propertyType;
        }

        if (bedrooms && !isNaN(bedrooms)) {
          filter.bedrooms = parseInt(bedrooms);
        }

        // if (price && !isNaN(price)) {
        //   filter.price = { $regex: `^${price}`, $options: "i" };
        // }
        // if (price && !isNaN(price)) {
        //   filter.$expr = {
        //     $eq: [{ $toDecimal: "$price" }, { $toDecimal: price }],
        //   };
        // }
        if (price && price.includes("-")) {
          const [min, max] = price.split("-").map(Number);

          filter.$expr = {
            $and: [
              { $gte: [{ $toDecimal: "$price" }, { $toDecimal: min }] },
              { $lte: [{ $toDecimal: "$price" }, { $toDecimal: max }] },
            ],
          };
        }
      }

      const listings = await db
        .collection("listingsAndReviews")
        .find(location ? filter : {}) // Empty filter = return all
        .project({
          _id: 1,
          name: 1,
          summary: 1,
          price: 1,
          review_score: "$review_scores.review_scores_rating",
        })
        .toArray();

      // Handle Decimal128 objects and ensure clean values
      const cleanedListings = listings.map((listing) => ({
        ...listing,
        price: listing.price?.$numberDecimal || listing.price || "N/A",
        review_score:
          listing.review_score?.$numberDecimal ||
          listing.review_score ||
          "Not rated",
      }));

      res.json(cleanedListings);
    } catch (error) {
      console.error("Error in /listings route:", error);
      next(error);
    }
  });

  return router;
};
