const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/userControllers");

router.param("userId", async (req, res, next, userId) => {
  const foundUser = await controller.fetchUser(userId, next);
  if (foundUser) {
    req.userUpdate = foundUser;
    next();
  } else next({ status: 404, message: "User Not Found" });
});

router.post("/signup", controller.signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  controller.signin
);

router.get("/", controller.fetchUsers);

router.get("/:userId", controller.userDetail);

router.put("/:userId", controller.updateUser);

router.put("/:userId/class", controller.deleteBooking);

module.exports = router;
