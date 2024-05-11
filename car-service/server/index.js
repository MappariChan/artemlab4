const express = require("express");

const carRouter = require("./modules/car/car.router");

//Створення серверу для сервісу автомобілів
const app = express();

app.use(express.json());

app.use("/cars", carRouter);

app.listen(3001, () => {
  console.log("started");
});
