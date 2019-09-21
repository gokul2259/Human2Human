function setUpToken() {
  return {
    ...options,
    headers: {
      Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiN2E2ZjU5ZjgtYzJiMS0zN2RkLWE1MjktYjliYTU2MGE2ZDIzIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiI3YTM2MzVhZS1lMjE0LTQ1NmMtYWQ4Ny00MmM4MTBkMWIyYzkifQ.UnuxUWpdUKy8htGP5JUrxSkB3iaV7474_zmBpii8fz4"
    },
  };
}

function fetchJSON(api, options) {
  return fetch(new Request(`https:${api}`, setUpToken(options))).then(
    response => response.json()
  );
}

async function post(api, options = {}) {
  const { body } = options;
  await fetchJSON(api, {
    method: "POST",
    body: new FormData(body)
  });
}

async function get(api, options = {}) {
  await fetchJSON(api, Object.assign({ method: "GET" }, { ...options }));
}
