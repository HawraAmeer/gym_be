const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/typeControllers");
const upload = require("../middlewares/multer");

router.param("typeId", async (req, res, next, typeId) => {
  const foundType = await controller.fetchType(typeId, next);
  if (foundType) {
    req.type = foundType;
    next();
  } else next({ status: 404, message: "Type Not Found" });
});

router.get("/", controller.fetchTypes);

router.post("/", upload.single("image"), controller.createType);

router.get("/:typeId", controller.typeDetail);

router.put("/:typeId", upload.single("image"), controller.updateType);

router.delete("/:typeId", controller.deleteType);

module.exports = router;
