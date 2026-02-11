import rateLimit from "express-rate-limit";

export const dailyRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Daily request limit reached. Try again tomorrow.",
  },
  // console.log("rate limit checker...")
});
