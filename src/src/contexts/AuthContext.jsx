import { createContext, useContext, useEffect, useState } from 'react';
import authService, { getCurrentUser } from '@/features/users/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        getCurrentUser()
            .then((user) => setUser(user));
    }, []);

    const login = (loginUserData) => {
        return new Promise((resolve, reject) => {
            authService.login(loginUserData)
                .then((user) => {
                    setUser(user);
                    return user;
                })
                .then(resolve)
                .catch(reject);
        });
    };

    const logout = () => {
        return new Promise((resolve, reject) => {
            authService.logout()
                .then(() => {
                    setUser(null);
                    return resolve(true);
                })
                .catch(reject);
        });
    };

    const signup = (signupUserData) => {
        return new Promise((resolve, reject) => {
            authService.signup(signupUserData)
                .then((user) => {
                    setUser(user);
                    return user;
                })
                .then(resolve)
                .catch(reject);
        });
    };

    return (
        <AuthContext value={{ user: user, login, logout, signup }}>
            {children}
        </AuthContext>
    );
}

export const useAuth = () => useContext(AuthContext);