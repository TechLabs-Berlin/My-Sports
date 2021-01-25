import axios from 'axios';

export const requestEmail = async input => {
  return await axios
    .post('/api/users/forgotpassword', input)
    .catch((error) => {
      if(error.response.data.message){
        console.log(error.response.data.message)
    }})
  };