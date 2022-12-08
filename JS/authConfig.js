const msalConfig = {
    auth: {
      clientId: "a5b52a24-d704-4dd5-8ab3-81cd1dd0853b",
      authority: "bbcf450a-6e68-4e6f-b2c2-8fa05b5b8f36",
      redirectUri: "https://polite-pebble-0fcec7503.2.azurestaticapps.net/app/msalCallback.html",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
  };

  // Add here scopes for access token to be used at MS Graph API endpoints.
  const tokenRequest = {
    scopes: ["Mail.Read"]
  };