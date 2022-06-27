import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJson = async function(url){
  try {

    let res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    let data = await res.json();
    if(!res.ok) throw new Error(`${data.message} ${res.status}`);

    return data;

  } catch (error) {
    throw error;
  }
}