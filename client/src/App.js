import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components
import Home from './components/customers/Home';
import Dashboard from './components/dashboard/Dashboard';
import Overview from './pages/Overview';
import DateControl from './pages/dateControl/DateControl';
import DisplayCustomersToday from './pages/display/DisplayCustomersToday';
import DisplayCustomersAll from './pages/display/DisplayCustomersAll';
import OpeningMessage from './pages/openingMessage/OpeningMessage';
import SetupTemplate from './pages/setupTemplate/SetupTemplate';
import Auth from './pages/auth/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/boardpanel' element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path='overview' element={<Overview />} />
            <Route path='datecontrol' element={<DateControl />} />
            <Route path='display1' element={<DisplayCustomersToday />} />
            <Route path='display2' element={<DisplayCustomersAll />} />
            <Route path='messagecontrol' element={<OpeningMessage />} />
            <Route path='setuptemplate' element={<SetupTemplate />} />
        </Route>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
