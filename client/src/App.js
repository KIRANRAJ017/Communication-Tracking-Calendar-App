import AdminPage from './adminPage';
import './App.css';
import HomePage from './homePage';
import LoginForm from './loginPage';
import RegisterForm from './registerPage';
import {HashRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/register' element={<RegisterForm/>} />
          <Route path='/admin' element={<AdminPage/>} />
        </Routes>
       </Router>
    </div>
  );
}

export default App;
