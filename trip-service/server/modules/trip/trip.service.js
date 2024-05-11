const { randomUUID } = require("crypto");

//Сервіс для сутності рейсу

class TripService {
  trips = [];

  //Логіка отримання інформації про всі рейси
  getAll() {
    return this.trips;
  }

  //Логіка отримання інформації про певний рейс
  getOne(tripId) {
    return this.trips.find((trip) => trip.id === tripId);
  }

  //Логіка створення нового рейсу
  create(trip) {
    const tripId = randomUUID();
    this.trips.push({ id: tripId, ...trip });
    return this.getOne(tripId);
  }

  //Логіка видалення існуючого рейсу
  delete(tripId) {
    this.trips = this.trips.filter((trip) => trip.id != tripId);
  }

  //Логіка оновлення даних існуючого рейсу
  update(tripId, updatedTrip) {
    this.trips = this.trips.map((trip) =>
      trip.id === tripId ? { id: tripId, ...updatedTrip } : trip
    );
    return this.getOne(tripId);
  }
}

const tripService = new TripService();

module.exports = tripService;
