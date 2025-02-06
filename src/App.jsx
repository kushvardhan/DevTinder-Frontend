import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Feed from './components/Feed'; 
import Login from './components/Login';
import SignUp from './components/SignUp';
import Connections from './components/Connections';
import Requests from './components/Requests';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <div className="w-full h-screen">
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login/>}/>
            <Route path='signup' element={<SignUp></SignUp>} />
            <Route path="request" element={<Requests/>}/>
            <Route path="connections" element={<Connections/>}/>
          </Route>
          
          {/* Fallback for invalid paths */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-full text-red-500 text-2xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
