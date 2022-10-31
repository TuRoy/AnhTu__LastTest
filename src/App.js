import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Users from './components/Users';
import CreateUser from './components/CreateUser';
import Edituser from './components/Edituser';
import PrivateRouter from './PrivateRouter';
import InfoUser from './components/InfoUser';

function App() {
  return (
   
   <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='users' element={<PrivateRouter> <Users></Users> </PrivateRouter>}></Route>
        <Route path='users/:id' element={<PrivateRouter> <InfoUser></InfoUser> </PrivateRouter>}></Route>
        <Route path='createuser' element={ <PrivateRouter> <CreateUser></CreateUser> </PrivateRouter>}></Route>
        <Route path='users/edits/:edit' element={ <PrivateRouter> <Edituser></Edituser> </PrivateRouter>}></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
