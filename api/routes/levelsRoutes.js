const express = require("express");
const LevelsControllers = require("../controllers/LevelsControllers");
const router = express.Router();

router
  .get("/levels", LevelsControllers.getAllLevels)
  .get("/levels/:id", LevelsControllers.getLevelById)
  .post("/levels", LevelsControllers.registerLevel)
  .post("/levels/:id/restore", LevelsControllers.restoreLevel)
  .put("/levels/:id", LevelsControllers.updateLevel)
  .delete("/levels/:id", LevelsControllers.deleteLevel);

module.exports = router;