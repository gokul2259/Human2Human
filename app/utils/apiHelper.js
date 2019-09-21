import { NativeModules } from "react-native";

const setUpToken = (options = {}) => ({
  ...options,
  headers: {
    Authorization:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiN2E2ZjU5ZjgtYzJiMS0zN2RkLWE1MjktYjliYTU2MGE2ZDIzIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiI3YTM2MzVhZS1lMjE0LTQ1NmMtYWQ4Ny00MmM4MTBkMWIyYzkifQ.UnuxUWpdUKy8htGP5JUrxSkB3iaV7474_zmBpii8fz4"
  }
});

const fetchJSON = (api, options = {}) =>
  fetch(new Request(`https://${api}`, setUpToken(options))).then(response =>
    response.json()
  );

const post = async (api, { body = {} } = {}) =>
  await fetchJSON(api, { method: "POST", body: new FormData(body) });

const get = async (api, options = {}) =>
  await fetchJSON(api, { ...options, method: "GET" });

module.exports = {
  get,
  post
};
