export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserLogged extends UserRegistration {
  token?: string | null;
}
