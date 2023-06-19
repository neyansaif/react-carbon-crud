import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateData = async (updatedData) => {
   try {
      const response = await axios.put(
         `http://localhost:8000/ingredients/${updatedData.id}`,
         updatedData
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.message);
   }
};

export const useUpdateData = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation(updateData, {
      onSuccess: () => {
         queryClient.invalidateQueries("ingredients");
      },
   });

   return mutation;
};
