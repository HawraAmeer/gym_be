const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/gymControllers");
const upload = require("../middlewares/multer");

router.param("gymId", async (req, res, next, gymId) => {
  const foundGym = await controller.fetchGym(gymId, next);
  if (foundGym) {
    req.gym = foundGym;
    next();
  } else next({ status: 404, message: "Shop Not Found." });
});

router.get("/", controller.fetchGyms);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.createGym
);

router.get("/:gymId", controller.gymDetail);

router.put("/:gymId", upload.single("image"), controller.updateGym);

router.delete("/:gymId", controller.deleteGym);

// router.post(
//   "/:gymId/donuts",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   createDonut
// );

module.exports = router;
