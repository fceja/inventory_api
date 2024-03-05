import { Request, Response } from "express";

import dbPool from "@database/DbInit";
import { UserRepository } from "@database/repositories/UserRepository";

const testDbBaseRepoFind = async () => {
  const repository = new UserRepository(dbPool, "_users");

  const userModel = {
    email: "fceja@myemail.com",
    password: "",
    createdAt: "",
    lastUpdated: "",
  };

  const results = await repository.find(userModel);

  // log result(s)
  if (results) {
    results.forEach((result) => {
      console.log(`\n${Object.entries(result)}`);
    });
  }
};

const testDBBaseRepoCreate = async () => {
  const repository = new UserRepository(dbPool, "_user_roles");

  const userRoleModel = {
    user_id: "63",
    role: "user",
  };

  // log result
  const result = await repository.create(userRoleModel);
  if (result) {
    console.log(`created -> ${result}`);
  }
};

export const getTestHandler = (_req: Request, res: Response) => {
  return res.send({
    message: `from - /src/routes/test/GetTestHandler.ts`,
  });
};
