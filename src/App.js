import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-3xl font-bold underline">Hello world!</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
    </div>
  );
}

export default App;

// please dont forget to use the .map js function for listing your parent
// and child components. it will map from an array the total number of
// list object throught the array. use a protected dashboard as your main
// page and use components to load on top. use the navigate() function
// that is inside of the react router to get the response from the post
// request upon the loging to pass the varibales from your login page/
// omponent to the dashboard page. what you want to passs in is an id
// anumber and the jwt token. this will allow you to pass the id number
// back to the serve and simply run the token verify on the dahboard
// page. then you can pass the id, once on the dahboard to the omponents
// to render the data that is asociated with that id number.
