const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const controller = require("../controllers/classControllers");
const upload = require("../middlewares/multer");

router.param("classId", async (req, res, next, classId) => {
  const foundClass = await controller.fetchClass(classId, next);
  if (foundClass) {
    req.class = foundClass;
    next();
  } else next({ status: 404, message: "Class Not Found" });
});

router.get("/", controller.fetchClasses);

router.get("/:classId", controller.classDetail);

router.put("/:classId", upload.single("image"), controller.updateClass);

router.delete("/:classId", controller.deleteClass);

module.exports = router;
