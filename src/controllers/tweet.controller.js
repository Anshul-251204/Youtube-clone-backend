import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/errorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { content } = req.body;

    if (!content) {
        throw new ApiError(400, "title of tweet is required");
    }

    const tweet = await Tweet.create({
        content: content,
        owner: req.user._id,
    });

    res.status(200).json(
        new ApiResponse(200, tweet, "tweet is successfully create !")
    );
});

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const { userId } = req.params;

    const tweets = await Tweet.find({ owner: userId });

    if (!tweets) {
        throw new ApiError(401, "NO tweets by this user !");
    }

    res.status(200).json(new ApiResponse(200, tweets, "all tweets of user"));
});

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params;
    const content = req.body.content;

    const tweet = await Tweet.findById(tweetId);

    tweet.content = content;
    tweet.save();

    res.status(200).json(
        new ApiResponse(200, tweet, "tweet successfully update .")
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params;

    const tweet = await Tweet.findByIdAndDelete(tweetId);

    res.status(200).json(
        new ApiResponse(200, tweet, "tweet successfully deleted !")
    );
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
