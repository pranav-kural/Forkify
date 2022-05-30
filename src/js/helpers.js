/**
 * Helper functions used throughout the project
 */

export const getJSON = async function (url) {
  try {
    // fetch single recipe
    const res = await fetch(url);
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
