interface SystemStoredUserModelI {
  system_users_id: number;
  email: string;
  password: string;
  role: string;
}

class SystemStoredUserModel {
  readonly systemUsersId: number;
  readonly email: string;
  readonly role: string;

  constructor({ system_users_id, email, role }: SystemStoredUserModelI) {
    this.systemUsersId = system_users_id;
    this.email = email;
    this.role = role;
  }
}

export default SystemStoredUserModel;
