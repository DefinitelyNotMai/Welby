import { createContext, useContext, useState } from 'react';

interface UserContextType {
    userId: string;
    setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType>({
    userId: '',
    setUserId: () => { }
});

export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState('');

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
