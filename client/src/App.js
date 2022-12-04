import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components
import Home from './components/customers/Home';
import Dashboard from './components/dashboard/Dashboard';
import Overview from './pages/Overview';
import DateControl from './pages/dateControl/DateControl';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/boardpanel' element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path='overview' element={<Overview />} />
            <Route path='datecontrol' element={<DateControl />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
