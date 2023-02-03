import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
    auth: {
        clientId: "6f90ece6-0ed6-4a6d-88a9-9a4457aa796d",
        authority: "https://login.microsoftonline.com/organizations",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error('now', message);
                        return;
                    case LogLevel.Info:
                        console.info('now', message);
                        return;
                    case LogLevel.Verbose:
                        console.debug('now', message);
                        return;
                    case LogLevel.Warning:
                        console.warn('now', message);
                        return;
                    default:
                        console.info('now', message);
                        return;
                }
            }
        }
    }
};


export const loginRequest = {
    scopes: ["User.Read"]
};


export const graphConfig = {
    graphMeEndpoint: "https://invoiceprocessservice.azurewebsites.net/api/v1/"
};