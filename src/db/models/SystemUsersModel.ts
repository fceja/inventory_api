interface SystemUsersI {
  email: string;
  password: string;
}

class SystemUsersModel {
  systemUsersId?: string;
  email?: string;
  password?: string;
  role?: string;
  createdAt?: string;
  lastUpdated?: string;

  constructor({ email, password }: SystemUsersI) {
    this.email = email;
    this.password = password;
  }
}

export default SystemUsersModel;
