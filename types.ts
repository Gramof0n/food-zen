export type Category = {
  id: number;
  title: string;
};

export type Item_type = {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
};

export type Metric_type = {
  amount: string;
  unitShort: string;
  unitLong: string;
};

export type Ingredient_type = {
  id: number;
  name: string;
  measures: {
    metric: Metric_type;
  };
};

export type Detailed_Product_Type = {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  extendedIngredients: [Ingredient_type];
  instructions: string;
};
