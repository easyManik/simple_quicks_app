import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cover from "./cover";
import Quicks from "./SimpleQuicks/Quicks";
import NewTask from "./component/NewTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cover />} replace="true" />
          <Route path="/quicks" element={<Quicks />} />
          <Route path="/newtask" element={<NewTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
