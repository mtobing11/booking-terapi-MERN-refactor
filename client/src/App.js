import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components
import Home from './components/customers/Home';
import Dashboard from './components/dashboard/Dashboard';
import DateControl from './pages/dateControl/DateControl';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/boardpanel' element={<Dashboard />}>
            <Route index element={<DateControl />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
