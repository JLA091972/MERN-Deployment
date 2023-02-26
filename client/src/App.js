import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Display from "./view/Display";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Details from "./view/Details";
import SortDescending from "./view/SortDescending";
import SortAscending from "./view/SortAscending";

// DETAILS == DISPLAY RANDOM NOTE

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <h1>NOTE WALL</h1> */}
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/create' element={<Create />} />
          <Route path = '/details' element={<Details />} /> 
          
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/sortdescending' element={<SortDescending />} />
          <Route path='/sortascending' element={<SortAscending />} />
          {/* <Route path = '/delete/:id' element={<Delete />} /> */}


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
