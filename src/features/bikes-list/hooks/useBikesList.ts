import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import bikesListAPI from "../../../services/bikes-list/bikes-list.api";

const fetchBikesList = async () => {
  const response = await bikesListAPI.getBikes();

  return response.data;
};

const useBikesList = () => {
  return useQuery(QueryKeysEnum.bikes, fetchBikesList);
};

export default useBikesList;
