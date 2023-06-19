import React from "react";
import "./hero2.scss";
import FormModel from "../Form/Form";
import Table from "../Table/Table";
import { Add } from "@carbon/react/icons";
import { Button, Loading, Search } from "@carbon/react";
import { useIngredients } from "../../Hooks/useIngredients";
const Hero2 = () => {
   const [isFormOpen, setIsFormOpen] = React.useState(false);
   const [searchValue, setSearchValue] = React.useState("");
   const { data, isLoading, error } = useIngredients();
   const toggleForm = () => {
      setIsFormOpen(!isFormOpen);
   };

   const filteredData = !data
      ? []
      : data.filter((ingredient) =>
           ingredient.ingredient
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        );
   return (
      <>
         <div className="hero2">
            <div>
               <small>Choose your Ingradients</small>
            </div>
            <div>
               <Search
                  size="lg"
                  placeholder="Find your items"
                  labelText="Search"
                  closeButtonLabelText="Clear search input"
                  onChange={(e) => setSearchValue(e.target.value)}
               />
            </div>
            <Button renderIcon={Add} onClick={toggleForm}>
               Add Taco
            </Button>
            {isFormOpen && (
               <FormModel toggleForm={toggleForm} isFormOpen={isFormOpen} />
            )}
         </div>
         {isLoading ? (
            <Loading className={"some-class"} withOverlay={false} />
         ) : error ? (
            <p>{error.message}</p>
         ) : (
            <Table data={filteredData} />
         )}
      </>
   );
};

export default Hero2;
