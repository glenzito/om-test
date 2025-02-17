import { shallowMount, createRouter, createWebHistory } from "@vue/test-utils"
import { createStore } from "vuex"
import HomeView from "@/views/HomeView.vue"

describe("HomeView.vue", () => {
  let wrapper
  let store
  let router

  beforeEach(() => {
    store = createStore({
      state: {
        countries: [],
        loading: false,
        error: null,
      },
      actions: {
        fetchCountries: jest.fn(),
      },
      getters: {
        sortedCountries: (state) => {
          return state.countries.sort((a, b) => a.name.localeCompare(b.name))
        },
      },
    })

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    })

    wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store, router],
      },
    })
  })

  it("calls fetchCountries on component creation", () => {
    expect(store.dispatch).toHaveBeenCalledWith("fetchCountries")
  })

  it("displays loading message when loading is true", async () => {
    await wrapper.vm.$store.commit("setLoading", true)
    expect(wrapper.find(".loading").exists()).toBe(true)
  })

  it("displays error message when there is an error", async () => {
    const errorMessage = "Failed to load countries"
    await wrapper.vm.$store.commit("setError", errorMessage)
    expect(wrapper.find(".error-message").text()).toBe(errorMessage)
  })

  it("renders countries grid when data is loaded", async () => {
    const mockCountries = [{ name: "Test Country", capital: "Test Capital", population: 1000 }]
    await wrapper.vm.$store.commit("setCountries", mockCountries)
    expect(wrapper.find(".countries-grid").exists()).toBe(true)
  })

  it("renders countries in alphabetical order", async () => {
    const mockCountries = [
      { name: "Country B", capital: "Capital B", population: 2000 },
      { name: "Country A", capital: "Capital A", population: 1000 },
    ]
    await wrapper.vm.$store.commit("setCountries", mockCountries)
    const countryNames = wrapper.findAll(".country-name").map((el) => el.text())
    expect(countryNames).toEqual(["Country A", "Country B"])
  })

  it("creates correct router links for countries", async () => {
    const mockCountries = [{ name: "Test Country", capital: "Test Capital", population: 1000 }]
    await wrapper.vm.$store.commit("setCountries", mockCountries)
    const routerLink = wrapper.find("router-link-stub")
    expect(routerLink.attributes("to")).toEqual({ name: "country", params: { country: "Test Country" } })
  })
})

