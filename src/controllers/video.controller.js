import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/errorResponse.js";
import  ApiResponse  from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    //TODO: get all videos based on query, sort, pagination

   // const video = await Video.find().skip(page * limit).limit(limit)


});

const publishAVideo = asyncHandler(async (req, res) => {

    const { title, description } = req.body;
    // TODO: get video, upload to cloudinary, create video

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required !");
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoLocalPath || !thumbnailLocalPath) {
        throw new ApiError(400, "Video and Thubmnail are required !");
    }

    const videos = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!videos || !thumbnail) {
        throw new ApiError(500, "Somewent Wrong while uploading video and thumbnail")
    }

    const video = await Video.create({
        videoFile:videos?.url,
        thumbnail:thumbnail?.url,
        title,
        description,
        duration:videos.duration,
        owner:req.user._id,

    })

    //we can make one extra db call to insure video is successfully upload or not !!!

    res.status(201).json(
        new ApiResponse(201, video, "video Successfully Uploaded"),
    )

    
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: get video by id

    const video = await Video.findById(videoId);

    if(!video) {
        throw new ApiError(400, "this video is not Available !!")
    }

    res.status(200).json(
        new ApiResponse(200, video, "Video get Successfully.")
    )
});

const updateVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params;
    //TODO: update video details like title, description, thumbnail

    const { title , description } = req.body;


    
    if(!title || !description ) {
        throw new ApiError(400, "Title and Description are Required !!!")
    }
    
    const thumbnailLocalPath = req.file?.path;
    
    // if you want make thumbnail required then you can do  
    
    // if (!thumbnailLocalPath) {
    //     throw new ApiError(400, "Thubmnail are required !");
    // }

    const newThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    const video = await Video.findById(videoId);

    console.log(video);

    video.title = title || video.title;
    video.description = description || video.description;
    video.thumbnail = newThumbnail?.url || video.thumbnail;

    await video.save()

    // if you want to not give data for making respone light then you can do

    res.status(200).json(
        new ApiResponse(200, video, "Video details update successfully.")
    )
});

const deleteVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params;
    //TODO: delete video

    const video = await Video.deleteOne({ _id: videoId });

    if (!video) {
        throw new ApiError(400, "this video is not Available !!");
    }

    res.status(200).json(
        new ApiResponse(200, "", "Video deleted Successfully.")
    );
    
    
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(400, "this video is not Available !!");
    }

    video.isPublished = !video.isPublished;
    await video.save();

    if( video.isPublished) {
        res.status(200).json(
            new ApiResponse(200, video, "video is published to everone.")
        )
    }else{
        res.status(200).json(
            new ApiResponse(200, video, "video is not published to everone.")
        );
    }

});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};
