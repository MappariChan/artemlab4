const { Router } = require("express");

const driverService = require("./driver.service");

const driverRouter = Router();

//Хендлер запиту на отримання всіх водіїв
driverRouter.get("/", async (req, res) => {
  const drivers = await driverService.getAll();
  return res.send(drivers);
});

//Хендлер запиту на отримання певного водія
driverRouter.get("/:driverId", async (req, res) => {
  const driver = await driverService.getOne(req.params.driverId);
  if (driver) return res.send(driver);
  return res.status(404).send();
});

//Хендлер запиту на створення нового водія
driverRouter.post("/", async (req, res) => {
  const driver = await driverService.create(req.body);
  if (!driver) return res.status(400).send();
  return res.send(driver);
});

//Хендлер запиту на оновлення даних водія
driverRouter.put("/:driverId", async (req, res) => {
  const updatedDriver = await driverService.update(
    req.params.driverId,
    req.body
  );
  if (updatedDriver) return res.send(updatedDriver);
  return res.status(404).send();
});

//Хендлер запиту на видалення існуючого водія
driverRouter.delete("/:driverId", (req, res) => {
  const driverToDelete = driverService.getOne(req.params.driverId);
  if (!driverToDelete) return res.status(404).send();
  driverService.delete(req.params.driverId);
  return res.status(204).send();
});

module.exports = driverRouter;
