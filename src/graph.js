import axios from "axios";
import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callMsGraph(accessToken, url, data) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const config = {
        headers: {
            Authorization: bearer
        }
    }
    console.log(accessToken, config, data)

    return axios.post(`${graphConfig.graphMeEndpoint}${url}`, data, config)

    // return fetch(graphConfig.graphMeEndpoint, options)
    //     .then(response => response.json())
    //     .catch(error => console.log(error));
}