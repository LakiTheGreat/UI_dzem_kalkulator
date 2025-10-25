const jams = 'jams';
const general_calculator = 'general-calculator';
const bouquets = 'bouquets';
const settings = 'settings';
const tomatoes = 'tomatoes';
const auth = 'auth';

export const routesAuth = {
  root: `${auth}`,
  login: `${auth}/login`,
};

export const routesJam = {
  root: `${jams}`,
  orders: `${jams}/orders`,
  inventory: `${jams}/inventory`,
  transactions: `${jams}/transactions`,
};

export const routesCalculator = {
  root: `${general_calculator}`,
};

export const routesBouquets = {
  root: `${bouquets}`,
};

export const routesSettings = {
  root: `${settings}`,
};

export const routesGeneralCalculator = {
  root: `${general_calculator}`,
};

export const routesTomatoes = {
  root: `${tomatoes}`,
  orders: `${tomatoes}/orders`,
  inventory: `${tomatoes}/inventory`,
  transactions: `${tomatoes}/transactions`,
};
