import { create } from "zustand";


interface UserConfig {
    notificationsEnabled?: boolean;
}


interface UserInfo {
    id: number,
    username: string;
    roles: string[];
    config?: UserConfig;
}

interface AuthState {
    isLoggedIn: boolean;
    user?: UserInfo;
    setUser: (user?: UserInfo) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: undefined,

    setUser: (user) =>
        set({
            user,
            isLoggedIn: !!user,
        }),

    logout: () =>
        set({
            user: undefined,
            isLoggedIn: false,
        }),
}));