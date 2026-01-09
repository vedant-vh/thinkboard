import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key") //user id or ip address

        if (!success) {
            return res.status(429).json({
                message:"too many requests, pls try again later"
            })
        }

        next();
    } catch (error) {
        console.log("rate limit error", error);
        next(error);
    }
}

export default rateLimiter;