import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public findUsers = async (q?: string): Promise<TUserDB[]> => {
    let result: TUserDB[]

    if (q) {
      result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${q}%`)
    } else {
      result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
    }

    return result
  }

  public async findUserById(id: string): Promise<TUserDB | undefined>  {
    const [response]: TUserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ id })

    return response
  }

  public insertUser = async (userDB: TUserDB): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(userDB)
  }
}