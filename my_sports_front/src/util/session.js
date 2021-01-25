import axios from 'axios';

export const signup = async user => {
  return await axios
    .post('/api/users', user)
    .catch((error) => {
      if(error.response.data.message){
        return error;
    }})
  };

export const login = async user => {
  return await axios
    .post('/api/session', user)
    .catch((error) => {
      console.log(error);
    })
  };
  
export const logout = async() => {
  return await axios
    .delete('/api/session')
    .catch((error) => {
      console.log(error);
    })
  };

export const checkLoggedIn = async (x) => {
  const response = await axios.get('/api/session');
  const { user } = response.data;
  let preloadedState = {};
  if (user) {
    preloadedState = {
      session: user
    };
  }
  return preloadedState;
};