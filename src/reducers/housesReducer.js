const initialState = {
  isInit: false,
  isWaiting: false,
  houses: [
    {
      id: 1,
      name: "Gryffindor",
      point: 0
    },
    {
      id: 2,
      name: "Hufflepuff",
      point: 0
    },
    {
      id: 3,
      name: "Ravenclaw",
      point: 0
    },
    {
      id: 4,
      name: "Slytherin",
      point: 0
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
