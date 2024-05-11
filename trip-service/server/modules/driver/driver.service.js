const { error } = require("console");
const { randomUUID } = require("crypto");

//Сервіс для сутності водія

class DriverService {
  drivers = [];

  //Логіка для отримання всіх водіїв з їхнім автомобілем
  async getAll() {
    return Promise.all(
      this.drivers.map(async (driver) => {
        const car = await fetch(`http://localhost:3001/cars/${driver.carId}`)
          .then((data) => data.json())
          .catch((_) => null);
        return {
          ...driver,
          car,
        };
      })
    );
  }

  //Логіка для отримання одного водія з його автомобілем
  async getOne(driverId) {
    const driver = this.drivers.find((driver) => driver.id === driverId);
    if (!driver) return null;
    const car = await fetch(`http://localhost:3001/cars/${driver.carId}`)
      .then((data) => data.json())
      .catch((_) => null);
    return { ...driver, car };
  }

  //Логіка для створення нового водія
  async create(driver) {
    const driverId = randomUUID();
    this.drivers.push({ id: driverId, ...driver });
    return await this.getOne(driverId);
  }

  //Логіка для видалення існуючого водія
  delete(driverId) {
    this.drivers = this.drivers.filter((driver) => driver.id != driverId);
  }

  //Логіка для оновлення даних існуючого водія
  async update(driverId, updatedDriver) {
    this.drivers = this.drivers.map((driver) =>
      driver.id === driverId ? { id: driverId, ...updatedDriver } : driver
    );
    return await this.getOne(driverId);
  }
}

const driverService = new DriverService();

module.exports = driverService;
