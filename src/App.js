import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/signup';
import { Home } from './pages/home';
import { Homepage } from './components/home';
import { Dashboard } from './components/dashboard';
import { Userprofile } from './components/user_profile';
import { Booking } from './components/booking';
import { Ticketbookingform } from './pages/ticket_booking_form';
import { Bookingform } from './pages/booking_form';
import { Movieupload } from './admin/movie_upload';
import { Feedback } from './pages/feedback_page';
import { MovieDetails } from './pages/movie_details';
import { Successresponse } from './response/success_response';
import { Adminpage } from './admin/admin_page';
import { Retrievefeedback } from './admin/retrieve_feedback';
import { Adminprofile } from './admin/admin_profile';
import { AdminBooking } from './admin/admin_booking';

function App() {


  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/homepage">
            <Homepage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/bookings">
            <Booking />
          </Route>
          <Route exact path="/userprofile">
            <Userprofile />
          </Route>
          <Route exact path="/feedback">
            <Feedback />
          </Route>
          <Route exact path="/bookingform">
            <Bookingform />
          </Route>
          <Route exact path="/pickceat">
            <Ticketbookingform />
          </Route>
          <Route exact path="/movieupload">
            <Movieupload />
          </Route>
          <Route exact path="/details">
            <MovieDetails />
          </Route>
          <Route exact path="/success">
            <Successresponse />
          </Route>
          <Route exact path="/adminpage">
            <Adminpage />
          </Route>
          <Route exact path="/retrievefeedback">
            <Retrievefeedback />
          </Route>
          <Route exact path="/adminprofile">
            <Adminprofile />
          </Route>
          <Route exact path="/adminbooking">
            <AdminBooking />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
