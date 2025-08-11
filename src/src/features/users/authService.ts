import { UserModel } from "./models/UserModel";
import { testUsers } from "@/tests/data";

export const getCurrentUser = async (): Promise<UserModel | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = localStorage.getItem('user');
            if (user) resolve(UserModel.fromJson(JSON.parse(user)));
            else resolve(null);
        }, 1500);
    });
};

export const isLoggedIn = async (): Promise<boolean> => {
    return await getCurrentUser().then((user) => user !== null);
};

export const login = async (credentials: { email: string; password: string }): Promise<UserModel> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = testUsers.find((user) => user.email === credentials.email);
            if (user && "password" === credentials.password) {
                localStorage.setItem('user', JSON.stringify(user));
                resolve(UserModel.fromJson(user));
                return;
            }
            else reject(Error("Invalid credentials", { cause: { name: "ValidationError" } }));
        }, 1500);
    });
}

export const signup = () => {}

export const logout = (): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.removeItem('user');
            resolve(true);
        }, 1500);
    });
}

export default {
    login,
    signup,
    logout,
    getCurrentUser,
    isLoggedIn,
}