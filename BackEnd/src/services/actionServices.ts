import { runQuery } from "../dal/dal";

export async function getAllAccounts() {
    const q = `SELECT id, fullName FROM Accounts ORDER BY id`;
    const res = await runQuery(q) as any[];
    return res.map(r => ({ id: r.id, fullName: r.fullName }));
}

export async function getActions(accountNumber: any) {
    const q = `
    SELECT
      id,
      accountNumber,
      actionType,
      amount,
      actionDate,
      interest,
      payments
    FROM Actions
    WHERE accountNumber = ?
    ORDER BY actionDate DESC, id DESC
  `;

    const res = await runQuery(q, [accountNumber]) as any[];
    return res.map(r => ({
        id: r.id,
        accountNumber: r.accountNumber,
        actionType: r.actionType,
        amount: r.amount,
        actionDate: r.actionDate,
        interest: r.interest,
        payments: r.payments,
    }));
}

export async function addNewAction(data: any) {
    const {
        accountNumber,
        actionType,
        amount,
        actionDate,
        interest,
        payments,
    } = data;

    if (actionDate) {
        const insertQ = `
      INSERT INTO Actions (
        accountNumber,
        actionType,
        amount,
        actionDate,
        interest,
        payments
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        await runQuery(insertQ, [
            accountNumber,
            actionType,
            amount,
            actionDate,
            interest,
            payments,
        ]);
    } else {

        const insertQ = `
      INSERT INTO Actions (
        accountNumber,
        actionType,
        amount,
        interest,
        payments
      )
      VALUES (?, ?, ?, ?, ?)
    `;
        await runQuery(insertQ, [
            accountNumber,
            actionType,
            amount,
            interest,
            payments,
        ]);
    }

    const lastIdRows = await runQuery(
        `SELECT last_insert_rowid() AS id`
    ) as any[];

    const newId = lastIdRows[0]?.id;

    const selectQ = `
    SELECT
      id,
      accountNumber,
      actionType,
      amount,
      actionDate,
      interest,
      payments
    FROM Actions
    WHERE id = ?
  `;
    const rows = await runQuery(selectQ, [newId]) as any[];

    return rows[0];
}