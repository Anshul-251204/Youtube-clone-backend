const asyncHandler = (passedFunction) => (req, res, next) => {
    Promise.resolve(passedFunction(req, res, next)).catch((err) => next(err));
};

export { asyncHandler };

// const asyncHandler2 = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }
