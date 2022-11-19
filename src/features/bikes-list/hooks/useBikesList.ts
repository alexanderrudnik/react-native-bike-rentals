import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import bikeList from "../../../services/bikes/bikes.api";

const fetchBikesList = async () => {
  const response = await bikeList.getBikes();

  return response.data;
};

const useBikesList = () => {
  return useQuery(QueryKeysEnum.BIKES, fetchBikesList);
};

export default useBikesList;
