const { Router } = require("express");

const tripService = require("./trip.service");

const tripRouter = Router();

//Хендлер запиту на отримання всіх рейсів
tripRouter.get("/", (req, res) => {
  const trips = tripService.getAll();
  return res.send(trips);
});

//Хендлер запиту на отримання певного рейсу
tripRouter.get("/:tripId", (req, res) => {
  const trip = tripService.getOne(req.params.tripId);
  if (trip) return res.send(trip);
  return res.status(404).send();
});

//Хендлер запиту на створення новго рейсу
tripRouter.post("/", (req, res) => {
  const trip = tripService.create(req.body);
  if (!trip) return res.status(400).send();
  return res.send(trip);
});

//Хендлер запиту на оновлення даних існуючого рейсу
tripRouter.put("/:tripId", (req, res) => {
  const updatedTrip = tripService.update(req.params.tripId, req.body);
  if (updatedTrip) return res.send(updatedTrip);
  return res.status(404).send();
});

//Хендлер запиту на видалення існуючого рейсу
tripRouter.delete("/:tripId", (req, res) => {
  const tripToDelete = tripService.getOne(req.params.tripId);
  if (!tripToDelete) return res.status(404).send();
  tripService.delete(req.params.tripId);
  return res.status(204).send();
});

module.exports = tripRouter;
