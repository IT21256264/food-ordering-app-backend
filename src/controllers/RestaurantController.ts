import { Request, Response } from "express";
import Restaurant from "../models/restuarent";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    // Extract the city parameter from the request URL
    const city = req.params.city;

    // Extract query parameters from the request URL
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    // Initialize an empty query object
    let query: any = {};

    // Add a case-insensitive regex query to match the city
    query["city"] = new RegExp(city, "i");

    // Check if there are any restaurants in the specified city
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      // If no restaurants found, return a 404 status with an empty data array and pagination info
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    // If selectedCuisines is provided, add a regex query to match any of the cuisines
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    // If searchQuery is provided, add a regex query to match the restaurant name or cuisines
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    // Set the number of items per page
    const pageSize = 10;
    // Calculate the number of items to skip based on the current page
    const skip = (page - 1) * pageSize;

    // Fetch the restaurants that match the query, sorted and paginated
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Get the total number of matching restaurants
    const total = await Restaurant.countDocuments(query);

    // Create a response object containing the data and pagination info
    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  searchRestaurant,
};
