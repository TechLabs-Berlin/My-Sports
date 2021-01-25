import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import FindEventPage from './Pages/FindEventPage';
import CreateEventPage from './Pages/CreateEventPage';
import EventPage from './Pages/EventPage';
import EventChatPage from './Pages/EventChatPage';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/EditProfilePage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import PasswordResetPage from './Pages/PasswordResetPage';
import NotFoundPage from './Pages/NotFoundPage';
import { AuthRoute, ProtectedRoute } from "./util/route";
import EditEventPage from './Pages/EditEventPage';
import AddFavSportsPage from './Pages/AddFavSportsPage';

function App() {
  return <BrowserRouter>
    <Switch>
      <AuthRoute path="/login" component={LoginPage}/>
      <AuthRoute path="/register" component={RegisterPage}/>
      <AuthRoute path="/forgotpassword" component={ForgotPasswordPage}/>
      <AuthRoute path="/passwordreset/:code" component={PasswordResetPage}/>
      <ProtectedRoute path="/dashboard" component={DashboardPage}/>
      <ProtectedRoute path="/find-event" component={FindEventPage}/>
      <ProtectedRoute path="/create-event" component={CreateEventPage}/>
      <ProtectedRoute path="/event/:id/edit" component={EditEventPage}/>
      <ProtectedRoute path="/event/:id" component={EventPage}/>
      <ProtectedRoute path="/profile/:id" component={ProfilePage}/>
      <ProtectedRoute path="/edit-profile/:id" component={EditProfilePage}/>
      <ProtectedRoute path="/add-sports/:id" component={AddFavSportsPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>
}

export default App;
