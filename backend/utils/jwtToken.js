// Create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
    // Creating new JWT Token
    const token = user.getJwtToken();
  
    // Set cookie expiration (fallback: 7 days if env variable is missing)
    const cookieExpiry =
      (process.env.COOKIE_EXPIRES_TIME || 7) * 24 * 60 * 60 * 1000;
  
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + cookieExpiry),
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "PRODUCTION", // Use secure cookies in production
      sameSite: "Strict", // Helps prevent CSRF attacks
    };
  
    // Remove sensitive data (like password) before sending user object
    user.password = undefined;
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  };
  
  module.exports = sendToken;
  