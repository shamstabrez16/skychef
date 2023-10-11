import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const [isLoading, setIsLoading]= useState(true);
  const [hasHttpError,setHasHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://meals-http-365f3-default-rtdb.firebaseio.com/meals.json"  // added ".json" to the URL
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }
        const data = await response.json();
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
        console.log("Fetched meals:", data);
      } catch (error) {
        setIsLoading(false);
        setHasHttpError(error.message+" Error fetching meals. Please try again."); // Set the error message here
      }
    };
  
    fetchMeals();
  }, []);

  if(isLoading){
return <section className={classes.MealsLoading}>
  <p>loading...</p> 
</section>
  }

  if (hasHttpError) {
    return (
      <section className={classes.MealsError}>
        <p>{hasHttpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
