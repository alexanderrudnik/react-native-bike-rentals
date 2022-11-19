import { Dispatch, SetStateAction } from "react";

export interface Filter {
  color: string[];
  model: string[];
  location: string;
  rating: [string, string];
}

export interface FilterProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}
