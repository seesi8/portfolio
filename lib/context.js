import React from 'react';

export const UserContext = React.createContext({user: undefined, username: undefined});
export const ThemeContext = React.createContext({vertical: false, width: 0});