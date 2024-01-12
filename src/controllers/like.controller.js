import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/errorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: toggle like on video

    const checkVideoIsliked = await Like.findOne({
        $and: [{ likedBy: req.user._id }, { video: videoId }],
    });

    if (!checkVideoIsliked) {
        const like = await Like.create({
            video: videoId,
            likedBy: req.user._id,
        });

        res.status(200).json(new ApiResponse(200, like, "video liked"));
    } else {
        await Like.findByIdAndDelete(checkVideoIsliked._id);

        res.status(200).json(new ApiResponse(200, "", "video unliked"));
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    //TODO: toggle like on comment

    const checkCommentIsLiked = await Like.findOne({
        $and: [{ likedBy: req.user._id }, { commentId: commentId }],
    });

    if (!checkCommentIsLiked) {
        const like = await Like.create({
            comment: commentId,
            likedBy: req.user._id,
        });

        res.status(200).json(new ApiResponse(200, like, "Comment liked"));
    } else {
        await Like.findByIdAndDelete(checkCommentIsLiked._id);
        console.log(toggle);

        res.status(200).json(new ApiResponse(200, "", "Comment unliked"));
    }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    //TODO: toggle like on tweet
    const checkTweetIsLiked = await Like.findOne({
        $and: [{ likedBy: req.user._id }, { tweet: tweetId }],
    });

    if (!checkTweetIsLiked) {
        const like = await Like.create({
            tweet: tweetId,
            likedBy: req.user._id,
        });

        res.status(200).json(new ApiResponse(200, like, "Tweet liked"));
    } else {
        await Like.findByIdAndDelete(checkTweetIsLiked._id);

        res.status(200).json(new ApiResponse(200, "", "Tweet unliked"));
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const _id = req.user._id;

    const likedVideo = await Like.aggregate([
        {
            $match: { likedBy: _id },
        },
    ]);

  
    const likedvideo = await Like.populate(likedVideo, { path: "video" });

    res.status(200).json(
        new ApiResponse(200, likedvideo, "All Videos Liked By You")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
