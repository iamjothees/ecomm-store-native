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

export const login = async (credentials: { email?: string; phoneNumber?: string; password: string }): Promise<UserModel> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = testUsers.find((user) => (user.email === credentials.email || user.phoneNumber === credentials.phoneNumber));
            if (user && "password" === credentials.password) {
                localStorage.setItem('user', JSON.stringify(user));
                resolve(UserModel.fromJson(user));
                return;
            }
            else reject({ message: "Invalid credentials", cause: { name: "InvalidCredentialsError" } });
        }, 1500);
    });
}

export const signup = async (signupData: { email?: string; phoneNumber?: string; password: string, firstName: string, lastName: string }): Promise<UserModel> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userExists = testUsers.find((user) => (user.email === signupData.email || user.phoneNumber === signupData.phoneNumber));
            if (userExists) {
                reject({ message: "User already exists", cause: { name: "UserAlreadyExistsError" } });
                return;
            }

            const newUser = {
                id: `user-${Math.random().toString(36).substring(2, 9)}`,
                email: signupData.email,
                phoneNumber: signupData.phoneNumber,
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true,
                isEmailVerified: false,
                isPhoneNumberVerified: false,
                preferences: {
                    language: "en-US",
                    currency: "USD",
                    notifications: {
                        email: true,
                        push: true,
                        sms: false
                    }
                },
                shippingAddresses: [],
                billingAddresses: []
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            resolve(UserModel.fromJson(newUser));
        }, 1500);
    });
}

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