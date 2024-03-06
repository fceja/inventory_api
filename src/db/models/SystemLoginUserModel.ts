interface SystemLoginUserI {
  email: string;
  password: string;
}

class SystemLoginUserModel {
  readonly email: string;
  readonly password: string;

  constructor({ email, password }: SystemLoginUserI) {
    this.email = email;
    this.password = password;
  }
}

export default SystemLoginUserModel;
