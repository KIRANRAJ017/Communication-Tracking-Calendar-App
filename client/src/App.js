import './App.css';
import HomePage from './components/homePage';
import LoginForm from './components/loginPage';
import RegisterForm from './components/registerPage';
import AdminPage from './components/adminPage';
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import UserPage from './components/userPage';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/register' element={<RegisterForm/>} />
          <Route path='/admin' element={<AdminPage/>} />
          <Route path='/user' element={<UserPage/>} />
        </Routes>
       </Router>
    </div>
  );
}

export default App;
