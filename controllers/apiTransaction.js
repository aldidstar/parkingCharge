const Vehicle = require("../models/Vehicle");

module.exports = {
  transactionRead: async (req, res) => {
    try {
      const vehicle = await Vehicle.find();

      const result = vehicle.map((item) => {
        return {
          type: item.type,
          name: item.name,
          platNumber: item.platNumber,
          price: `Rp.${item.price},00`,
          start: item.start.toLocaleString(),
          end: item.end.toLocaleString(),
        };
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(201).json({
        success: false,
        message: "something wrong",
        err,
      });
    }
  },
  transactionSearch: async (req, res) => {
    const { type, start, end, price } = req.query;
    try {
      let regexp = new RegExp(type, "gi");

      let search = [];
      if (type || price || start || end) {
        type && search.push({ type: regexp }),
          price && search.push({ price }),
          start && search.push({ start: new Date(start).toString() }),
          end && search.push({ end: new Date(end).toString() });
      } else {
        search.push({});
      }

      const vehicle = await Vehicle.find({ $and: search });
      const data = vehicle.map((item) => {
        return {
          type: item.type,
          name: item.name,
          platNumber: item.platNumber,
          price: `Rp.${item.price},00`,
          start: item.start.toLocaleString(),
          end: item.end.toLocaleString(),
        };
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "something wrong",
        err,
      });
    }
  },

  transactionCreate: async (req, res) => {
    let regexCar = new RegExp("mobil", "gi");
    let regexMotor = new RegExp("Motor", "gi");
    let startDate = new Date(req.body.start);
    let endDate = new Date(req.body.end);
    const daysCar = 80000;
    const daysMotor = 40000;
    const hoursCar = 5000;
    const hoursMotor = 2000;
    let seconds = Math.floor((endDate - startDate) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    if (minutes >= 1) {
      hours += 1;
    }
    let priceDay = 0;
    let priceHour = 0;
    let totalPrice = 0;

    if (regexCar.test(req.body.type) === true) {
      priceDay = daysCar * days;
      priceHour = hoursCar * hours;
      totalPrice = priceDay + priceHour;
    } else {
      priceDay = daysMotor * days;
      priceHour = hoursMotor * hours;
      totalPrice = priceDay + priceHour;
    }

    try {
      const vehicle = await Vehicle.create({
        type:
          req.body.type[0].toUpperCase() +
          req.body.type.slice(1, req.body.type.length),
        name: req.body.name,
        platNumber: req.body.platNumber,
        start: startDate,
        end: endDate,
        price: totalPrice,
      });

      const result = {
        type: vehicle.type,
        name: vehicle.name,
        platNumber: vehicle.platNumber,
        price: `Rp.${vehicle.price},00`,
        start: vehicle.start.toLocaleString(),
        end: vehicle.end.toLocaleString(),
      };

      res.status(201).json(result);
    } catch (err) {
      res.status(201).json({
        success: false,
        message: "something wrong",
        err,
      });
    }
  },
};
