import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePostData = () => {
   const queryClient = useQueryClient();
   const postData = async (data) => {
      try {
         const response = await axios.post(
            "http://localhost:8000/Ingredients",
            data
         );
         return response.data;
      } catch (error) {
         throw new Error("An error occurred while posting data");
      }
   };

   const mutation = useMutation(postData, {
      onSuccess: () => {
         queryClient.invalidateQueries("Ingredients");
      },
   });

   return mutation;
};

export default usePostData;
