import axios from 'axios';

export const getUserInfo = async (id) => {
    return await axios
    .get('/api/users/' + id)
    .catch((error) => {
      if(error.response.data.message){
        return error;
    }})
};

export const sendChanges = async (input) => {
  return await axios
  .put('/api/users/', input)
  .catch((error) => {
    console.log(error)
  })
}

export const updateRatings = async (input) => {
  return await axios
  .put('/api/users/update-ratings', input)
  .catch((error) => {
    console.log(error)
  })
}