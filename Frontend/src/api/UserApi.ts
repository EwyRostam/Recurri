import { getCookie } from "../helpers/CookieHelpers";

export type User = {
  picture: string;
  name: string;
  email: string;
};

const BASE_URL = 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos&sources=READ_SOURCE_TYPE_PROFILE&key=';

export async function getUser() {
  try {
    const response = await fetch(
      BASE_URL + import.meta.env.VITE_APP_API_KEY,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}


export async function getJsonWebToken() {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
      "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        'code': `${getCookie("code")}`,
        'redirect_uri': 'http://localhost:5173',
        'client_id': import.meta.env.VITE_APP_CLIENT_ID,
        'client_secret': import.meta.env.VITE_APP_CLIENT_SECRET,
        'grant_type': 'authorization_code'
    })
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return null!;
  }
  
}
