"use strict";

const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const Vehicle = require("../models/Vehicle");

const should = chai.should();
chai.use(chaiHTTP);

describe("data", () => {
  // setiap sebelum melakukan test saya tambahkan satu data "name test"
  beforeEach(function (done) {
    let vehicle = new Vehicle({
      type: "Mobil",
      name: "test",
      price: 600000,
      platNumber: "AA1111BB",
      start: "2021-11-01 00:40:00",
      end: "2022-11-01 00:40:00",
    });
    vehicle.save(function (err) {
      done();
    });
  });

  // setiap habis melakukan test saya kosongkan data di collection vehicle
  afterEach(function (done) {
    Vehicle.findOneAndRemove({ name: "test" }, (err) => {
      done();
    });
  });

  it("seharusnya mendapatkan semua daftar transaction dengan pencarian type dan start parkir yang ada di table Vehicle dengan metode GET", function (done) {
    chai
      .request(server)
      .get("/api/transaction/search?type=mobil&start=2021-11-01 00:40:00")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.have.property("name");
        res.body[res.body.length - 1].should.have.property("type");
        res.body[res.body.length - 1].should.have.property("price");
        res.body[res.body.length - 1].should.have.property("start");
        res.body[res.body.length - 1].should.have.property("end");
        res.body[res.body.length - 1].should.have.property("platNumber");
        res.body[res.body.length - 1].name.should.equal("test");
        res.body[res.body.length - 1].type.should.equal("Mobil");
        res.body[res.body.length - 1].price.should.equal("Rp.600000,00");
        res.body[res.body.length - 1].start.should.equal(
          "01/11/2021, 00:40:00"
        );
        res.body[res.body.length - 1].end.should.equal("01/11/2022, 00:40:00");
        res.body[res.body.length - 1].platNumber.should.equal("AA1111BB");
        done();
      });
  });

  it("seharusnya menambahkan satu transaction parkir selama 1 jam 1 menit 2 detik mobil membayar 10000 dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/api/transaction")
      .send({
        type: "Mobil",
        name: "Jazz",
        platNumber: "AA1111BA",
        start: "2021-11-01 00:40:00",
        end: "2021-11-01 01:41:02",
      })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("name");
        res.body.should.have.property("type");
        res.body.should.have.property("price");
        res.body.should.have.property("start");
        res.body.should.have.property("end");
        res.body.should.have.property("platNumber");
        res.body.name.should.equal("Jazz");
        res.body.type.should.equal("Mobil");
        res.body.price.should.equal("Rp.10000,00");
        res.body.start.should.equal("01/11/2021, 00:40:00");
        res.body.end.should.equal("01/11/2021, 01:41:02");
        res.body.platNumber.should.equal("AA1111BA");
        Vehicle.findOneAndRemove({ name: "Jazz" }, (err) => {
          done();
        });
      });
  });

  it("seharusnya menambahkan satu transaction parkir selama 1 jam 56 detik mobil membayar 5000 dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/api/transaction")
      .send({
        type: "Mobil",
        name: "Jazz",
        platNumber: "AA1111BA",
        start: "2021-11-01 00:40:00",
        end: "2021-11-01 01:40:56",
      })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("name");
        res.body.should.have.property("type");
        res.body.should.have.property("price");
        res.body.should.have.property("start");
        res.body.should.have.property("end");
        res.body.should.have.property("platNumber");
        res.body.name.should.equal("Jazz");
        res.body.type.should.equal("Mobil");
        res.body.price.should.equal("Rp.5000,00");
        res.body.start.should.equal("01/11/2021, 00:40:00");
        res.body.end.should.equal("01/11/2021, 01:40:56");
        res.body.platNumber.should.equal("AA1111BA");
        Vehicle.findOneAndRemove({ name: "Jazz" }, (err) => {
          done();
        });
      });
  });

  it("seharusnya menambahkan satu transaction parkir selama 1 hari 6 jam  mobil membayar 110.000 dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/api/transaction")
      .send({
        type: "Mobil",
        name: "Jazz",
        platNumber: "AA1111BA",
        start: "2021-11-01 00:40:00",
        end: "2021-11-02 06:40:00",
      })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("name");
        res.body.should.have.property("type");
        res.body.should.have.property("price");
        res.body.should.have.property("start");
        res.body.should.have.property("end");
        res.body.should.have.property("platNumber");
        res.body.name.should.equal("Jazz");
        res.body.type.should.equal("Mobil");
        res.body.price.should.equal("Rp.110000,00");
        res.body.start.should.equal("01/11/2021, 00:40:00");
        res.body.end.should.equal("02/11/2021, 06:40:00");
        res.body.platNumber.should.equal("AA1111BA");
        Vehicle.findOneAndRemove({ name: "Jazz" }, (err) => {
          done();
        });
      });
  });
});
