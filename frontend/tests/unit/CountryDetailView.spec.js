import { shallowMount, createRouter, createWebHistory } from "@vue/test-utils"
import { createStore } from "vuex"
import CountryDetailView from "@/views/CountryDetailView.vue"

describe("CountryDetailView.vue", () => {
  let wrapper
  let store
  let router
  let mockRoute

  beforeEach(() => {
    mockRoute = {
      params: {
        countryName: "Test Country",
      },
    }

    store = createStore({
      state: {
        countryDetails: null,
        loading: false,
        error: null,
      },
      actions: {
        fetchCountryDetails: jest.fn((countryName) => {
      
          return new Promise((resolve) => {
            setTimeout(() => {
              if (countryName === "Error Country") {
                resolve({ error: "Failed to load country details" })
              } else {
                resolve({
                  name: "Test Country",
                  capital: "Test Capital",
                  population: 1000,
                  region: "Test Region",
                  languages: ["Test Language"],
                })
              }
            }, 500)
          })
        }),
      },
    })

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          name: "countryDetail",
          path: "/country/:countryName",
        },
      ],
    })

    wrapper = shallowMount(CountryDetailView, {
      global: {
        plugins: [store, router],
        mocks: {
          $route: mockRoute,
        },
      },
    })
  })

  it("calls fetchCountryDetails on component creation", async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)) 
    expect(store.dispatch).toHaveBeenCalledWith("fetchCountryDetails", "Test Country")
  })

  it("displays loading message when loading is true", async () => {
    await wrapper.vm.$store.commit("setLoading", true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".loading").exists()).toBe(true)
  })

  it("displays error message when there is an error", async () => {
    await wrapper.vm.$store.dispatch("fetchCountryDetails", "Error Country")
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".error-message").text()).toBe("Failed to load country details")
  })

  it("renders country details when data is loaded", async () => {
    await wrapper.vm.$store.dispatch("fetchCountryDetails", "Test Country")
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".country-info").exists()).toBe(true)
  })

  it("updates country details when route changes", async () => {
    const newCountryName = "New Country"
    await router.push({ name: "countryDetail", params: { countryName: newCountryName } })
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("fetchCountryDetails", newCountryName)
  })

  it("back button navigates to home page", async () => {
    await wrapper.vm.$store.dispatch("fetchCountryDetails", "Test Country")
    await wrapper.vm.$nextTick()
    const pushSpy = jest.spyOn(router, "push")
    await wrapper.find(".back-button").trigger("click")
    expect(pushSpy).toHaveBeenCalledWith("/")
  })
})

