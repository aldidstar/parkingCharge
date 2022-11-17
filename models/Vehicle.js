const { Schema, model } = require("mongoose");

const vehicleSchema = new Schema(
  {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    platNumber: {
      type: String,
    },
    price: {
      type: Number,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Vehicle", vehicleSchema);
