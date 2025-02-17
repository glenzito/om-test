const request = require("supertest")
const app = require("../app")
const axios = require("axios")

jest.mock("axios")

let server

beforeAll(async () => {
  server = app.listen(0) 
})

afterAll(() => {
  server.close()
})

describe("GET /countries", () => {
  it("should return a list of countries", async () => {
    const mockResponse = {
      data: [
        {
          name: { common: "South Africa" },
          flags: { svg: "https://flagcdn.com/za.svg" },
        },
        {
          name: { common: "Botswana" },
          flags: { svg: "https://flagcdn.com/bw.svg" },
        },
      ],
    }

    axios.get.mockResolvedValue(mockResponse)

    const res = await request(server).get("/countries")
    console.log("Response body:", res.body)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
    expect(res.body[0].name).toBe("South Africa")
    expect(res.body[1].name).toBe("Botswana")
  })
})

describe("GET /countries/:name", () => {
  it("should return details of a country", async () => {
    const mockResponse = {
      data: [
        {
          name: { common: "South Africa" },
          population: 59308690,
          capital: ["Pretoria"],
          flags: { svg: "https://flagcdn.com/za.svg" },
        },
      ],
    }
    axios.get.mockResolvedValue(mockResponse)

    const res = await request(server).get("/countries/South Africa")
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("South Africa")
    expect(res.body.capital).toBe("Pretoria")
    expect(res.body.population).toBe(59308690)
    expect(res.body.flag).toBe("https://flagcdn.com/za.svg")
  })

  it("should return 404 for a non-existent country", async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } })

    const res = await request(server).get("/countries/NonExistentCountry")
    expect(res.status).toBe(404)
  })
})

