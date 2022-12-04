import { Bike } from "../../../services/bikes/bikes.types";
import { Filter } from "../models/filter.model";

class FilterService {
  filterByModel(array: Bike[], filter: Filter) {
    return array.filter((bike) =>
      filter.model.some((model) =>
        bike.model.toLowerCase().includes(model.toLowerCase())
      )
    );
  }

  filterByColor(array: Bike[], filter: Filter) {
    return array.filter((bike) =>
      filter.color.some((color) =>
        bike.color.toLowerCase().includes(color.toLowerCase())
      )
    );
  }

  filterByLocation(array: Bike[], filter: Filter) {
    return array.filter((bike) =>
      bike.location.toLowerCase().includes(filter.location.toLowerCase())
    );
  }

  filterByRating(array: Bike[], filter: Filter) {
    return array.filter(
      (bike) =>
        parseInt(filter.rating[0], 10) <= bike.rating &&
        parseInt(filter.rating[1], 10) >= bike.rating
    );
  }
}

const filterService = new FilterService();

export const getFilteredBikes = (bikes: Bike[], filter: Filter) => {
  if (bikes) {
    let result: Bike[] = bikes;

    result = filter.color.length
      ? filterService.filterByColor(result, filter)
      : result;
    result = filter.model.length
      ? filterService.filterByModel(result, filter)
      : result;
    result = filter.location
      ? filterService.filterByLocation(result, filter)
      : result;
    result =
      filter.rating[0] && filter.rating[1]
        ? filterService.filterByRating(result, filter)
        : result;

    return result;
  }

  return [];
};
