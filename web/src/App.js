import './App.scss';
import Feed from "./components/Feed.js"
import Alerts from "./components/Alerts.js"

function App() {
   return (
      <div className="App">
         <div className="wrapper">
            <div className="content">
               <h1 className="logo"><img src="/logo.svg" alt="S&S"/></h1>
               <Feed/>
               <Alerts/>
            </div>
         </div>
      </div>
   );
}

export default App;
