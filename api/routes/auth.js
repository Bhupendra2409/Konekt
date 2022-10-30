const router = require("express").Router();
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

//register
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(
      new ErrorResponse("Provide valid username,email,password", 400)
    );
  }
  try {
    const exists = await User.findOne({ email: email });
    if (exists) {
      return next(new ErrorResponse("Already registered!", 400));
    } else {
      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(200).json(newUser);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {

  try {
    const user = await User.findOne({ email:req.body.email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("No user Found!", 400));
    } else {
      const isMatch = await user.matchPassword(req.body.password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials!", 400));
      }
      const { password,updatedAt, ...other } = user._doc;

      res.status(200).json({ success: true,user:other});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
