import axios from "axios";
import Cookies from "js-cookie";

/**
 * HttpService is a service for handling HTTP requests.
 *
 * @class
 * @module HttpService
 */
export default class HttpService {
  /**
   * Creates an instance of axios with predefined settings.
   *
   * @private
   * @static
   * @returns {axios} An instance of axios.
   */

  private static api = (file_upload = false) => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
      headers: {
        "Content-Type": file_upload
          ? "multipart/form-data"
          : "application/json",
        Authorization: "Bearer " + Cookies.get("token") || "",
      },
    });

    api.interceptors.request.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) return Promise.reject();
        return Promise.reject(error);
      }
    );
    api.interceptors.response.use((config) => {
      const token = Cookies.get("token");
      if (token && token !== "" && config.headers)
        config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    return api;
  };

  /**
   * Sends a GET request to the specified URL.
   *
   * @public
   * @static
   * @param {string} url - The URL to send the request to.
   * @param {Object} params - The parameters to send with the request.
   * @returns {Promise<any>} A promise that resolves to the response data.
   */
  public static get = async (url: string, params = {}) => {
    return await this.api().get(url, { params });
  };

  /**
   * Sends a POST request to the specified URL.
   *
   * @public
   * @static
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<any>} A promise that resolves to the response data.
   */
  public static post = async (url: string, data = {}, file_upload = false) => {
    if (file_upload) return await this.api(true).post(url, data);
    return await this.api().post(url, data);
  };

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @public
   * @static
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<any>} A promise that resolves to the response data.
   */
  public static delete = async (url: string, data = {}) => {
    return await this.api().delete(url, data);
  };

  /**
   * Sends a PUT request to the specified URL.
   *
   * @public
   * @static
   * @param {string} url - The URL to send the request to.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<any>} A promise that resolves to the response data.
   */
  public static put = async (url: string, data = {}) => {
    return await this.api().put(url, data);
  };
}
