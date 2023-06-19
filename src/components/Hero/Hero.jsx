import React from "react";
import "./hero.scss";
import { InlineLoading, Stack } from "@carbon/react";
import { useIngredients } from "../../Hooks/useIngredients";

const Hero = () => {
   const { data, isLoading, error } = useIngredients();
   const calculateTotal = (property) => {
      if (!data) {
         return 0;
      }

      return data.reduce((accumulator, ingredient) => {
         const value = parseFloat(ingredient[property]);

         if (!isNaN(value)) {
            return accumulator + value;
         }

         return accumulator;
      }, 0);
   };

   const totalCalories = calculateTotal("calories");
   const totalFat = calculateTotal("fat");
   const totalProtien = calculateTotal("protein");
   const totalCarbs = calculateTotal("carbs");

   if (isLoading) {
      return (
         <InlineLoading
            status="active"
            iconDescription="Loading"
            description="Loading data..."
         />
      );
   }
   if (error) {
      return <p>{error.message}</p>;
   }
   return (
      <div className="hero">
         <h6>Nutritional totals 👀</h6>
         <Stack gap={2} orientation="horizontal">
            <div className="element">
               <small>Calories ✨</small>
               <h3>{totalCalories}</h3>
            </div>
            <div className="element">
               <small>Fats ✨</small>
               <h3>{totalFat}</h3>
            </div>
            <div className="element">
               <small>Protein ✨</small>
               <h3>{totalProtien}</h3>
            </div>
            <div className="element">
               <small>Carbs ✨</small>
               <h3>{totalCarbs}</h3>
            </div>
         </Stack>
      </div>
   );
};

export default Hero;
