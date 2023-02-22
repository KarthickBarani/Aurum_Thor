
export const msalConfig = {
    auth: {
        clientId: "6f90ece6-0ed6-4a6d-88a9-9a4457aa796d",
        authority: "https://login.microsoftonline.com/organizations",
        redirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};