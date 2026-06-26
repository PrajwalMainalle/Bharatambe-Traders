const rateLimit = {};

/**
 * In-memory rate limiter middleware to protect password reset endpoints.
 * @param {number} limit Maximum number of requests allowed in the window
 * @param {number} windowMs Window duration in milliseconds
 */
const rateLimiter = (limit, windowMs) => {
  return (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();

    if (!rateLimit[ip]) {
      rateLimit[ip] = [];
    }

    // Filter out requests outside the time window
    rateLimit[ip] = rateLimit[ip].filter((timestamp) => now - timestamp < windowMs);

    if (rateLimit[ip].length >= limit) {
      return res.status(429).json({
        message: "Too many password reset requests. Please try again after 15 minutes.",
      });
    }

    rateLimit[ip].push(now);
    next();
  };
};

module.exports = rateLimiter;
