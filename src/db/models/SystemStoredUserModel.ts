interface SystemStoredUserModelI {
  system_user_id: number;
  email: string;
  password: string;
  role: string;
}

class SystemStoredUserModel {
  readonly systemUserId: number;
  readonly email: string;
  readonly role: string;

  constructor({ system_user_id, email, role }: SystemStoredUserModelI) {
    this.systemUserId = system_user_id;
    this.email = email;
    this.role = role;
  }
}

export default SystemStoredUserModel;
