import { defineStore } from "pinia";
import axios from "axios";

//const axiosInstance = axios.create({ withCredentials: true });
const axiosInstance = axios.create();

import options from "../globalOptions";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authUser: null,
    didAutoLogout: false,
    token: "",
    authError: false,
    authErrorDescription: "",
    timer: 0,
  }),
  getters: {
    authToken: (state) => state.token,
    isLoggedIn: (state) => !!state.authUser,
  },
  actions: {
    async auth(username: string, password: string) {
      try {
        /**Obtem o cookie do servico de autenticacao do Laravel  */
        //axios.defaults.withCredentials = true;
        const csrfCookieResponse = await axiosInstance.get(
          `${options.baseURL}/sanctum/csrf-cookie`
          // { withCredentials: true }
        );

        if (csrfCookieResponse.status === 204) {
          await this.login(username, password);
        } else {
          throw new Error(`Erro ao tentar estabelecer sessão.`);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async login(username: string, password: string) {
      try {
        const response = (await axios
          .post(
            `${options.baseURL}/api/v1/auth`,
            {
              username,
              password,
            },
            {
              headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          )
          .catch(async (error) => {
            /**Receber um código 404 significa que o usuário já está logado e
             * o backend tentou retornar uma página home inexistente.
             * Trata-se de um bug no Fortify. Então usam-se os dados
             * armazenados no browser DB.
             */
            console.log("Login Error: ", error);
            if (error.response.status === 404) {
              await this.logout();
              const response = await axiosInstance
                .post(
                  `${options.baseURL}/login`,
                  {
                    username,
                    password,
                  },
                  {
                    headers: {
                      Accept: "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    },
                  }
                )
                .catch((error) => {
                  this.setAuthError(true);
                });
            }
          })) as any;

        console.log("Login Response: ", response);
        if (response.status === 200) {
          this.setAuthUser(response.data);
          this.setAuthError(false);
        }
      } catch (error) {
        console.log("Login error: ", error);
        this.setAuthError(true);
      }
    },

    async tryAutoLogin() {
      //
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const tokenCreatedAt = localStorage.getItem("tokenCreatedAt");

      console.log("Auto Login token: ", token);

      if (!user || !token) {
        localStorage.clear();
        this.router.push("/login");
      } else {
        const parsedUser = JSON.parse(user);
        this.setAuthUser({
          user: parsedUser,
          token,
          tokenCreatedAt,
        });
      }
    },

    async logout() {
      const response = await axiosInstance
        .post(`${options.baseURL}/logout`, {})
        .catch((_) => {
          localStorage.clear();
        });
      localStorage.clear();
      console.log("Logging out: ", response);

      clearTimeout(this.timer);
      this.authUser = null;
      this.router.replace("/login");
    },

    setAuthError(hasErrors: boolean) {
      this.authError = hasErrors;
    },

    setAuthErrorDescription(description: string) {
      this.authErrorDescription = description;
    },

    setAuthUser(authData: any) {
      const tokenCreationDatetime = Date.parse(authData.tokenCreatedAt);

      const tokenExpirationDatetime = new Date(
        tokenCreationDatetime + 120 * 60 * 1000 // O token tem vida de 2 horas. Aqui se converte para milisegundos
      );
      console.log("Token creation: ", new Date(tokenExpirationDatetime));

      const nowTimeInMillis = new Date().getTime();
      const tokenExpirationTimeInMillis = tokenExpirationDatetime.getTime();

      if (tokenExpirationTimeInMillis >= nowTimeInMillis + 10000) {
        this.authUser = authData.user;
        this.token =
          authData.token && authData.token.split("|")[1]
            ? authData.token.split("|")[1]
            : authData.token;

        if (authData.user) {
          localStorage.setItem("user", JSON.stringify(this.authUser));
          localStorage.setItem("token", this.token);
          localStorage.setItem("tokenCreatedAt", authData.tokenCreatedAt);
        } else {
          localStorage.clear();
        }

        this.timer = setTimeout(() => {
          this.logout();
        }, tokenExpirationTimeInMillis - nowTimeInMillis) as any;
      } else {
        this.logout();
      }
    },

    async fetchToken() {
      const tokenData = await axiosInstance
        .get(`${options.baseURL}/api/v1/token/create`, {
          withCredentials: true,
        })
        .catch((error) => {
          console.log("Token error", error);
        });

      console.log("Token data: ", tokenData);
    },
  },
});
