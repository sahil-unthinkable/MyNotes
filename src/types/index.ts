export type User = {
  name: string;
};

export type AuthContextType = {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
};
