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
        return new Promise((resolve) => {
            authService.login(loginUserData)
                .then((user) => {
                    setUser(user);
                    return user;
                })
                .then((user) => resolve(user));
        });
    };

    const logout = () => {
        return new Promise((resolve) => {
            authService.logout()
                .then(() => {
                    setUser(null);
                    return resolve(true);
                });
        });
    };

    return (
        <AuthContext value={{ user: user, login, logout }}>
            {children}
        </AuthContext>
    );
}

export const useAuth = () => useContext(AuthContext);