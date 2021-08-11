import './App.css';
import { BrowserRouter, Switch, Route, Link, Router } from 'react-router-dom';
import Login from './Components/Login';
import authService from './Services/AuthService';
import Sidebar from './Components/Sidebar';
import Users from './Pages/Users';
import Crusts from './Pages/Crusts';
import Toppings from './Pages/Toppings';
import Orders from './Pages/Orders';
import Delivery from './Pages/Delivery';
import ReportsUsers from './Pages/ReportsUsers';
import ReportsCrusts from './Pages/ReportsCrusts';
import ReportsToppings from './Pages/ReportsToppings';
import ReportsOrders from './Pages/ReportsOrders';
import ReportsDelivery from './Pages/ReportsDelivery';
import Profile from './Pages/Profile';

function App() {
  const user = authService.getCurrentUser();

  return (
    <div>
      <BrowserRouter>
        <Sidebar authorized={user} />
        <Switch>
          <Route exact path={"/login"} component={Login} />
          <Route path={"/users"} exact component={Users} />
          <Route path={"/crusts"} exact component={Crusts} />
          <Route path={"/toppings"} exact component={Toppings} />
          <Route path={"/orders"} exact component={Orders} />
          <Route path={"/delivery"} exact component={Delivery} />
          <Route path={"/reports/users"} exact component={ReportsUsers} />
          <Route path={"/reports/crusts"} exact component={ReportsCrusts} />
          <Route path={"/reports/toppings"} exact component={ReportsToppings} />
          <Route path={"/reports/orders"} exact component={ReportsOrders} />
          <Route path={"/reports/delivery"} exact component={ReportsDelivery} />
          <Route path={"/profile"} exact component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
