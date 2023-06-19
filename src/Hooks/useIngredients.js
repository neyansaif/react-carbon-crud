import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useIngredients = () => {
   const { isLoading, error, data } = useQuery({
      queryKey: ["ingredients"],
      queryFn: () =>
         axios
            .get("http://localhost:8000/Ingredients")
            .then((response) => response.data)
            .catch((error) => {
               console.log(error);
            }),
   });

   return { data, isLoading, error };
};
