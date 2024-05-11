const { randomUUID } = require("crypto");

//Сервіс для сутності автомобіля

class CarService {
  cars = [];

  //Логіка отримання всіх афтомобілів
  getAll() {
    return this.cars;
  }

  //Логіка отримання одного автомобіля
  getOne(carId) {
    return this.cars.find((car) => car.id === carId);
  }

  //Логіка створення нового автомобіля
  create(car) {
    const carId = randomUUID();
    this.cars.push({ id: carId, ...car });
    return this.getOne(carId);
  }

  //Логіка видалення існуючого автомобіля
  delete(carId) {
    this.cars = this.cars.filter((car) => car.id != carId);
  }

  //Логіка оновлення інформації певного автомобіля
  update(carId, updatedCar) {
    this.cars = this.cars.map((car) =>
      car.id === carId ? { id: carId, ...updatedCar } : car
    );
    return this.getOne(carId);
  }
}

const carService = new CarService();

module.exports = carService;
