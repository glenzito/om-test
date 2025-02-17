import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import HomeView from "@/views/HomeView.vue";
import CountryDetailView from "@/views/CountryDetailView.vue";

describe("Country Flow Integration", () => {
  let wrapper;
  let store;
  let router;

  beforeEach(() => {
    store = createStore({
      state: {
        countries: [],
        countryDetails: null,
      },
      mutations: {
        setCountries(state, countries) {
          state.countries = countries;
        },
        setCountryDetails(state, details) {
          state.countryDetails = details;
        },
      },
      actions: {
        fetchCountries: jest.fn(),
        fetchCountryDetails: jest.fn(),
      },
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/country/:countryName",
          name: "countryDetail",
          component: CountryDetailView,
        },
      ],
    });

    wrapper = mount(App, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it("completes the full country flow", async () => {
    const mockCountries = [
      { name: "Test Country", capital: "Test Capital", population: 1000 },
    ];
    await store.commit("setCountries", mockCountries);

    expect(wrapper.find(".countries-grid").exists()).toBe(true);

    await wrapper.find(".country-card").trigger("click");

    const mockDetails = {
      name: "Test Country",
      capital: "Test Capital",
      population: 1000,
      region: "Test Region",
      languages: ["Test Language"],
    };
    await store.commit("setCountryDetails", mockDetails);

    expect(router.currentRoute.value.name).toBe("countryDetail");

    expect(wrapper.find(".country-info").exists()).toBe(true);
  });
});
