import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import { AxiosError } from 'axios';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('access_token', response.data.data.access_token);
            this.setAuth(true);
            this.setUser(response.data.data.user);
        } catch (e) {
            console.error((e as Error).message);
        }
    }

    async registration(name: string, email: string, password: string, password_confirmation: string) {
        try {
            const response = await AuthService.registration(name, email, password, password_confirmation);
            localStorage.setItem('access_token', response.data.data.access_token);
            this.setAuth(true);
            this.setUser(response.data.data.user);
        } catch (e) {
            console.error((e as Error).message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
        } catch (e) {
            // this.handleAccessError(e, this.logout);
            console.error((e as Error).message);
        } finally {
            this.setAuth(false);
            this.setUser({} as IUser);
            localStorage.removeItem('access_token');
        }
    }

    async fetchUser() {
        this.setLoading(true);

        try {
            const response = await UserService.fetchUser();
            this.setAuth(true);
            this.setUser(response.data.data);
        } catch (e) {
            // this.handleAccessError(e, this.fetchUser);
            console.error((e as Error).message);
        } finally {
            this.setLoading(false);
        }
    }

    async handleAccessError(err: any, restartFunction: Function) {
        if (err instanceof Error) {
            if (err instanceof AxiosError) {
                if (err.response) {
                    if (localStorage.getItem('access_token')) {
                        if (err.response.status === 401) {
                            try {
                                const response = await AuthService.refresh();
                                localStorage.setItem('access_token', response.data.data.access_token);
                                await restartFunction();
                                return;
                            } catch (e) {
                                console.error((e as Error).message);
                                return;
                            }
                        }
                    }
                }
            }

            console.error(err.message);
        }
    }

    async sendEmailConfirmationNotification() {
        try {
            await AuthService.sendEmailConfirmationNotification();
        } catch (e) {
            // this.handleAccessError(e, this.sendEmailConfirmationNotification);
            console.error((e as Error).message);
        }
    }
}
