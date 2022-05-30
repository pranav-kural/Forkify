/**
 * Helper functions used throughout the project
 */
import { API_CALL_TIMEOUT_SECONDS } from './config';

export const getJSON = async function (url) {
  try {
    // fetch single recipe, request time's out if it takes longer than 5 seconds
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
    throw new Error(err);
  }
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
