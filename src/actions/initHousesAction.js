export const INIT_DATA = "INIT_DATA";

export const initHousesAction = housesData => ({
  type: INIT_DATA,
  payload: housesData
});
