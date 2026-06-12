//Hook Layer for managing state and api
import {useContext} from "react";
import {AuthContext} from "../auth.context.jsx";
import {loginUser, registerUser, logoutUser, getCurrentUser} from "../services/auth.api.js";

export const useAuth = () => {
    const {user, setUser, isLoading, setIsLoading} = useContext(AuthContext);

    const handleLogin = async ({email, password}) => {
        setIsLoading(true);
        try{
        const data = await loginUser({email, password});
        setUser(data.user);
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // re-throw the error so that Login.jsx can handle it
        } finally {
            setIsLoading(false);
        }
    }

    const handleRegister = async ({username, email, password}) => {
        setIsLoading(true);
        try {
            const data = await registerUser({username, email, password});
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCurrentUser = async () => {
        setIsLoading(true);
        try {
            const data = await getCurrentUser();
            setUser(data.user);
        } catch (error) {
            console.error("Failed to fetch current user:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        user,
        isLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchCurrentUser
    }

}