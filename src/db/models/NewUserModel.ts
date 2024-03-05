interface NewUserInterface {
  email: string;
  password: string;
  role: string;
  createdAt: string;
  lastUpdated: string;
}

class NewUserModel {
  email: string;
  password: string;
  role: string;
  createdAt: string;
  lastUpdated: string;

  constructor({ email, password }: NewUserInterface) {
    this.email = email;
    this.password = password;
    this.role = "user";
    this.createdAt = new Date().toISOString();
    this.lastUpdated = new Date().toISOString();
  }
}

export default NewUserModel;
