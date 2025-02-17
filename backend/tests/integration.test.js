const request = require("supertest");
const app = require("../app");
const countryService = require("../services/countryService");

describe("Integration tests for /countries endpoint", () => {
  it("should return a list of countries including South Africa and Botswana", async () => {
    const res = await request(app).get("/countries");

    expect(res.status).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body.some((country) => country.name === "South Africa")).toBe(
      true
    );
    expect(res.body.some((country) => country.name === "Botswana")).toBe(true);
  });

  it("should return 500 if service throws an error", async () => {
    countryService.getAllCountries = jest
      .fn()
      .mockRejectedValue(new Error("Service Error"));

    const res = await request(app).get("/countries");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal Server Error");
  });
});

describe("Integration tests for /countries/:name endpoint", () => {
  it("should return South Africa details when country is found", async () => {
    const res = await request(app).get("/countries/South Africa");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "South Africa");
    expect(res.body).toHaveProperty("population");
    expect(res.body).toHaveProperty("capital");
  });

  it("should return 404 if country is not found", async () => {
    const res = await request(app).get("/countries/NonExistentCountry");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Country not found");
  });

  it("should return 500 if there is an internal server error", async () => {
    countryService.getCountryDetails = jest
      .fn()
      .mockRejectedValue(new Error("Service Error"));

    const res = await request(app).get("/countries/South Africa");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal Server Error");
  });
});
