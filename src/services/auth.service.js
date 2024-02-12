import axios from "axios";
import Cookies from "js-cookie";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Logs the user in.
 *
 * @function
 * @async
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @throws Will throw an error if the login request fails.
 */
const login = async (email, password) => {
  try {
    const resp = await myAxios.post("/api/login", {
      email: email,
      password: password,
    });
    let response = resp.data;
    Cookies.set("token", response.token);

    const user = await myAxios.get("/api/user", {
      headers: {
        Authorization: `Bearer ${response.token}`,
      },
    });
    const userResponse = user.data;
    localStorage.setItem("user", JSON.stringify(userResponse.user || {}));
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const registerUser = async (
  firstname,
  lastname,
  email,
  password,
  phone_number,
  city,
  zip,
  street,
  house_number
) => {
  try {
    const resp = await myAxios.post("/api/register", {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      phone_number: phone_number,
      city: city,
      zip: parseInt(zip),
      street: street,
      house_number: house_number,
    });
    let response = resp.data;
    Cookies.set("token", response.token);
    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const createOrganisation = async (name, description) => {
  console.log(Cookies.get("token"));
  try {
    const resp = await myAxios.post(
      "/api/organisations",
      {
        name: name,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    let response = resp.data;
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { login, registerUser, createOrganisation };
