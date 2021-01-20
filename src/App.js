import "./App.css";
import Login from "./components/login";
import UserForm from "./containers/UserForm";
import ComposeMessage from "./components/ComposeMessage";
import MessageBox from "./containers/MessageBox";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
      <h1> Log In Here </h1>
      <Login />
      <h1> New User Here </h1>
      <UserForm />
      <h1> Write a Message Here </h1>
      <ComposeMessage />
      <h1> The Messages Component </h1>
      <MessageBox />
    </div>
  );
}

export default App;
