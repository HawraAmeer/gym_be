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
  } else next({ status: 404, message: "Gym Not Found" });
});

router.get("/", controller.fetchGyms);

router.post("/", upload.single("image"), controller.createGym);

router.get("/:gymId", controller.gymDetail);

router.put("/:gymId", upload.single("image"), controller.updateGym);

router.delete("/:gymId", controller.deleteGym);

router.post("/:gymId/classes", upload.single("image"), controller.createClass);

module.exports = router;
