/**
 * Helper functions used throughout the project
 */
import { API_CALL_TIMEOUT_SECONDS } from './config';

export const getJSON = async function (url) {
  try {
    // fetch single recipe, request times out if it takes longer than 5 seconds
    const res = await Promise.race([
      fetch(url),
      timeout(API_CALL_TIMEOUT_SECONDS),
    ]);
    // retrieve data from response
    const data = await res.json();
    // check if request failed
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // return response data
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    // config the POST request obj
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    };
    // submit new recipe to API, request times out if it takes longer than 5 seconds
    const res = await Promise.race([
      fetch(url, postRequest),
      timeout(API_CALL_TIMEOUT_SECONDS),
    ]);
    // retrieve data from response
    const data = await res.json();
    // check if request failed
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // return response data
    return data;
  } catch (err) {
    throw err;
  }
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const isEmptyObject = obj => {
  for (let val in obj) return false;
  return true;
};
