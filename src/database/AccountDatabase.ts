import { TAccountDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class AccountDatabase extends BaseDatabase {
    public static TABLE_ACCOUNTS = "accounts";

    public static findAccounts = async (q?: string): Promise<TAccountDB[]> => {
        let result: TAccountDB[];

        if (q) {
            result = await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).where("name", "LIKE", `%${q}%`);
        } else {
            result = await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS);
        }

        return result;
    };

    public static findAccountById = async (id: string): Promise<TAccountDB | undefined> => {
        const [response]: TAccountDB[] = await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).where({ id });

        return response;
    };

    public static insertAccount = async (accountDB: TAccountDB): Promise<void> => {
        await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).insert(accountDB);
    };

    public static updateAccountBalance = async (id: string, balance: number): Promise<void> => {
        await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).update({ balance }).where({ id });
    };
}
