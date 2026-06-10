import { City } from "country-state-city";

export const indianCities = City.getCitiesOfCountry("IN").map(
  (city) => city.name
).sort()
.map((city) => ({
  value: city,
  label: city
}));