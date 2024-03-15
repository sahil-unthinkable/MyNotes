export type User = {
  name: string;
};

export type AuthContextType = {
  user?: User;
  updateUser: (user: User) => void;
};
