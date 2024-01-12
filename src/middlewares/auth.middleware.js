import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errorResponse.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header(Authorization)?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized required");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(402, error?.message || "Invalid token");
    }
});
