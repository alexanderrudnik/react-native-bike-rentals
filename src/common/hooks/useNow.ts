import { dateService } from "../../services/date/date.service";
import { useEffect, useState } from "react";

let id: ReturnType<typeof setInterval>;

export const useNow = () => {
  const [now, setNow] = useState(dateService.getNow());

  useEffect(() => {
    id = setInterval(() => {
      setNow(dateService.getNow());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return {
    now,
  };
};
