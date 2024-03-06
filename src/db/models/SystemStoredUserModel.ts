interface SystemStoredUserI {
  system_users_id: Number;
  email: string;
  password: string;
  role: string;
}

class SystemStoredUserModel {
  readonly systemUsersId: Number;
  readonly email: string;
  readonly role: string;

  constructor({ system_users_id, email, role }: SystemStoredUserI) {
    this.systemUsersId = system_users_id;
    this.email = email;
    this.role = role;
  }
}

export default SystemStoredUserModel;
