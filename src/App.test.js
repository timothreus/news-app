import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it("stuff and stuff", async () => {
  global.fetch = require('jest-fetch-mock')
  fetch
    .once(JSON.stringify([{ id: "1" }]))
    .once(JSON.stringify({ id: "2", name: "x" }))

  const app = new App()
  await app.myFunction()
}

)

/*
it('should create SET_ALL_PROJECTS action when fetching projects', () => {
  fetch
      .once(JSON.stringify([{ access_token: "12345" }]))
      .once(JSON.stringify({ name: "x" }))

  const expectedActions = [
      { type: "SET_ALL_PROJECTS", json: { name: "x" } },
  ]

  store.dispatch(actions.loadAllProjects.apply())
      .then(() => {     // FAILS HERE
          expect(store.getActions()).toEqual(expectedActions)
      })

});*/
