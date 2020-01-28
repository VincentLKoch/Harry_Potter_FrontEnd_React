import React from "react";
import renderer from "react-test-renderer";

import App from "../App";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import rootReducer from "../reducers/rootReducer";

const store = createStore(rootReducer);

describe("Testing Snapshoot:", () => {
  let testRenderer;
  let testInstance;
  it("Render correctly", () => {
    try {
      testRenderer = renderer.create(
        <Provider store={store}>
          <App />
        </Provider>
      );
      testInstance = testRenderer.root;
    } catch (error) {
      expect(error).toBeNull();
    }

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it("test images:", () => {
    const images = testInstance.findAllByType("img");
    expect(images.length).toBe(4);

    expect(images[0].props).toEqual({
      src: "./images/Gryffindor.png",
      alt: "Gryffindor"
    });
    expect(images[1].props).toEqual({
      src: "./images/Hufflepuff.png",
      alt: "Hufflepuff"
    });
    expect(images[2].props).toEqual({
      src: "./images/Ravenclaw.png",
      alt: "Ravenclaw"
    });
    expect(images[3].props).toEqual({
      src: "./images/Slytherin.png",
      alt: "Slytherin"
    });
  });

  it("test display of house point", () => {
    const papers = testInstance.findAllByProps({
      className: "MuiPaper-root MuiPaper-outlined MuiPaper-rounded"
    });
    expect(papers.length).toBe(4);
    for (let index = 0; index < 4; index++) {
      expect(papers[index].children.length).toBe(1);
      expect(papers[index].children[0]).toBe("0");
    }
  });

  it("test the two wizard lists (empty)", () => {
    const lists = testInstance.findAllByType("ul");
    expect(lists.length).toBe(2);
    expect(lists[0].children.length).toBe(0);
    expect(lists[1].children.length).toBe(0);
  });

  it("test the two adding form", () => {
    const forms = testInstance.findAllByProps({
      className: "MuiContainer-root MuiContainer-maxWidthLg"
    });
    expect(forms.length).toBe(4); //two add and two remove

    //ADD_PROFESSOR :
    let inputs = forms[0].children[0].children;
    expect(inputs.length).toBe(4);

    //inputs 0 : genre buttons
    let genreOptions = inputs[0].findAllByProps({
      className: "MuiButton-label"
    });
    expect(genreOptions.length).toBe(2); // M and F
    expect(genreOptions[0].children).toEqual(["M"]);
    expect(genreOptions[1].children).toEqual(["F"]);

    //inputs 1 : First Name
    let firstName = inputs[1].findAllByType("label");
    expect(firstName.length).toBe(1);
    expect(firstName[0].children).toEqual(["First Name"]);

    //inputs 2 : Last Name
    let lastName = inputs[2].findAllByType("label");
    expect(lastName.length).toBe(1);
    expect(lastName[0].children).toEqual(["Last Name"]);

    //inputs 3 : Add button
    let addButton = inputs[3].findAllByProps({
      className: "MuiButton-label"
    });
    expect(addButton.length).toBe(1);
    expect(addButton[0].children).toEqual(["Add"]);

    //ADD_STUDENT :
    inputs = forms[2].children[0].children;
    expect(inputs.length).toBe(5); //One more field than prof : house choice

    //inputs 0 : genre buttons
    genreOptions = inputs[0].findAllByProps({
      className: "MuiButton-label"
    });
    expect(genreOptions.length).toBe(2); // M and F
    expect(genreOptions[0].children).toEqual(["M"]);
    expect(genreOptions[1].children).toEqual(["F"]);

    //inputs 1 : First Name
    firstName = inputs[1].findAllByType("label");
    expect(firstName.length).toBe(1);
    expect(firstName[0].children).toEqual(["First Name"]);

    //inputs 2 : Last Name
    lastName = inputs[2].findAllByType("label");
    expect(lastName.length).toBe(1);
    expect(lastName[0].children).toEqual(["Last Name"]);

    //inputs 3 : House choice
    addButton = inputs[3].findAllByProps({
      className: "MuiButton-label"
    });
    expect(addButton.length).toBe(5);
    expect(addButton[0].children).toEqual(["Sorting Hat"]);
    expect(addButton[1].children).toEqual(["Gryffindor"]);
    expect(addButton[2].children).toEqual(["Hufflepuff"]);
    expect(addButton[3].children).toEqual(["Ravenclaw"]);
    expect(addButton[4].children).toEqual(["Slytherin"]);

    //inputs 4 : Add button
    addButton = inputs[4].findAllByProps({
      className: "MuiButton-label"
    });
    expect(addButton.length).toBe(1);
    expect(addButton[0].children).toEqual(["Add"]);

    //REMOVE_PROFESSOR
    inputs = forms[1].children;
    expect(inputs.length).toBe(1);
    let removeButton = inputs[0].findAllByProps({
      className: "MuiButton-label"
    });
    expect(removeButton.length).toBe(1);
    expect(removeButton[0].children).toEqual(["Remove Selected Wizard"]);

    //REMOVE_STUDENT
    inputs = forms[3].children;
    expect(inputs.length).toBe(1);
    removeButton = inputs[0].findAllByProps({
      className: "MuiButton-label"
    });
    expect(removeButton.length).toBe(1);
    expect(removeButton[0].children).toEqual(["Remove Selected Wizard"]);
  });
});
