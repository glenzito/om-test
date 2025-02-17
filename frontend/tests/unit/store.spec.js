import store from "@/store"
import { createStore } from "vuex"
import { describe, beforeEach, afterEach, it, expect } from "vitest"
import { jest } from "@jest/globals" // Added import for jest

describe("Vuex Store", () => {
  let testStore

  beforeEach(() => {
    testStore = createStore({
      state: { ...store.state },
      mutations: { ...store.mutations },
      actions: { ...store.actions },
      getters: { ...store.getters },
    })

    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("mutations", () => {
    it("setCountries updates the countries state", () => {
      const countries = [{ name: "Test Country", capital: "Test Capital", population: 1000 }]
      testStore.commit("setCountries", countries)
      expect(testStore.state.countries).toEqual(countries)
    })

    it("setCountryDetails updates the countryDetails state", () => {
      const details = {
        name: "Test Country",
        capital: "Test Capital",
        population: 1000,
        region: "Test Region",
        languages: ["Test Language"],
      }
      testStore.commit("setCountryDetails", details)
      expect(testStore.state.countryDetails).toEqual(details)
    })

    it("setLoading updates the loading state", () => {
      testStore.commit("setLoading", true)
      expect(testStore.state.loading).toBe(true)
    })

    it("setError updates the error state", () => {
      const error = "Test error message"
      testStore.commit("setError", error)
      expect(testStore.state.error).toEqual(error)
    })
  })

  describe("actions", () => {
    it("fetchCountries success scenario", async () => {
      const mockCountries = [{ name: "Test Country", capital: "Test Capital", population: 1000 }]
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })

      await testStore.dispatch("fetchCountries")

      expect(testStore.state.countries).toEqual(mockCountries)
      expect(testStore.state.error).toBeNull()
      expect(testStore.state.loading).toBe(false)
    })

    it("fetchCountries error scenario", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await testStore.dispatch("fetchCountries")

      expect(testStore.state.error).toBeTruthy()
      expect(testStore.state.loading).toBe(false)
    })

    it("fetchCountryDetails success scenario", async () => {
      const mockDetails = {
        name: "Test Country",
        capital: "Test Capital",
        population: 1000,
        region: "Test Region",
        languages: ["Test Language"],
      }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockDetails),
      })

      await testStore.dispatch("fetchCountryDetails", "Test Country")

      expect(testStore.state.countryDetails).toEqual(mockDetails)
      expect(testStore.state.error).toBeNull()
      expect(testStore.state.loading).toBe(false)
    })

    it("fetchCountryDetails error scenario", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await testStore.dispatch("fetchCountryDetails", "Invalid Country")

      expect(testStore.state.error).toBeTruthy()
      expect(testStore.state.loading).toBe(false)
    })
  })

  it("has a valid initial state", () => {
    expect(testStore.state.countries).toEqual([])
    expect(testStore.state.countryDetails).toBeNull()
    expect(testStore.state.loading).toBe(false)
    expect(testStore.state.error).toBeNull()
  })
})

