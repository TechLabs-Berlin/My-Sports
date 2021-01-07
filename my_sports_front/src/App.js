import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import FindEventPage from './Pages/FindEventPage'
import CreateEventPage from './Pages/CreateEventPage'
import EventPage from './Pages/EventPage'
import EventChatPage from './Pages/EventChatPage'
import ProfilePage from './Pages/ProfilePage'
import EditProfilePage from './Pages/EditProfilePage'
import NotFoundPage from './Pages/NotFoundPage'
import { AuthRoute, ProtectedRoute } from "./util/route";
import Header from './components/Header';


function App() {
  return <BrowserRouter>
    <Header />
    <Switch>
      <AuthRoute path="/login" component={LoginPage} />
      <AuthRoute path="/register" component={RegisterPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/find-event" component={FindEventPage} />
      <ProtectedRoute path="/create-event" component={CreateEventPage} />
      <ProtectedRoute path="/event/:id/chat" component={EventChatPage} />
      <ProtectedRoute path="/event/:id" component={EventPage} />
      <ProtectedRoute path="/profile/:id" component={ProfilePage} />
      <ProtectedRoute path="/edit-profile" component={EditProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
}

export default App;
