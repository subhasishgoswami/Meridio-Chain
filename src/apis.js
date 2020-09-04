import axios from 'axios';
import { serverLink } from './constants';

export async function get_all_users(){
  let x;
  await axios.get(`${serverLink}/run_model/get_users`).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
      throw error;
    },
  );
  return x;
};


export const get_user= async address => {
  let x;
  await axios.get(`${serverLink}/run_model/get_users/`+address).then(
    response => {
      x = response.data;
    },
    error => {
      console.log(error);
      throw error;
    },
  );
  return x;
};

export const add_user= async data => {
    let x;
    console.log(data)
    await axios.post(`${serverLink}/run_model/add_users`,data).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
        throw error;
      },
    );
    return x;
};

export const update_user= async data => {
    let x;
    await axios.post(`${serverLink}/run_model/update_users`,data).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
        throw error;
      },
    );
    return x;
};

export const delete_user= async data => {
    let x;
    await axios.post(`${serverLink}/run_model/delete_users`,data).then(
      response => {
        x = response.data;
      },
      error => {
        console.log(error);
        throw error;
      },
    );
    return x;
};