const { Router } = require("express");

const carService = require("./car.service");

const carRouter = Router();

//Хендлер запиту на отримання всіх автомобілів
carRouter.get("/", (req, res) => {
  const cars = carService.getAll();
  return res.send(cars);
});

//Хендлер запиту на отримання певного автомобіля
carRouter.get("/:carId", (req, res) => {
  const car = carService.getOne(req.params.carId);
  if (car) return res.send(car);
  return res.status(404).send();
});

//Хендлер запиту на створення нового автомобіля
carRouter.post("/", (req, res) => {
  const car = carService.create(req.body);
  if (!car) return res.status(400).send();
  return res.send(car);
});

//Хендлер запиту на оновлення даних існуючого автомобіля
carRouter.put("/:carId", (req, res) => {
  const updatedCar = carService.update(req.params.carId, req.body);
  if (updatedCar) return res.send(updatedCar);
  return res.status(404).send();
});

//Хендлер запиту на видалення існуючого автомобіля
carRouter.delete("/:carId", (req, res) => {
  const carToDelete = carService.getOne(req.params.carId);
  if (!carToDelete) return res.status(404).send();
  carService.delete(req.params.carId);
  return res.status(204).send();
});

module.exports = carRouter;
