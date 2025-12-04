import { Database as DB } from "better-sqlite3";
import { openDb, runQuery } from "./dal";


function initDbSchema(db: DB): void {

    const ddl = `
CREATE TABLE IF NOT EXISTS Accounts (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
fullName TEXT NOT NULL
 );

 CREATE TABLE IF NOT EXISTS Actions (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 accountNumber INTEGER NOT NULL,
 actionType TEXT NOT NULL CHECK (actionType IN ('withdrawal', 'deposit', 'loan')) DEFAULT 'withdrawal',
 amount REAL NOT NULL,
 actionDate  date NOT NULL DEFAULT (datetime('now')),
 interest REAL CHECK (interest >= 0),
 payments INTEGER CHECK (payments >= 0),
 FOREIGN KEY (accountNumber) REFERENCES Accounts(id) ON DELETE RESTRICT
 );
    `;

    db.exec("BEGIN");
    try {
        db.exec(ddl);
        db.exec("COMMIT");
    } catch (e) {
        db.exec("ROLLBACK");
        throw e;
    }
}

function generateSampleData() {
    //Accounts
    runQuery("INSERT INTO Accounts (fullName) VALUES ('David Cohen');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Sara Levi');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Moshe Israeli');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Noa Bar');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Yossi Katz');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Orna Maimon');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Amir Shalev');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Lior Ben Ami');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Galit Azulay');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Ronen Shachar');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Maya Peretz');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Nir Goldstein');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Tal Friedman');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Yael Mor');");
    runQuery("INSERT INTO Accounts (fullName) VALUES ('Eitan Rosen');");





    // //Actions
    // חשבון 1 – הפקדה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (1, 'deposit', 2500.00, NULL, NULL);");

    // חשבון 2 – משיכה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (2, 'withdrawal', 800.00, NULL, NULL);");

    // חשבון 3 – הלוואה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (3, 'loan', 15000.00, 4.5, 24);");

    // חשבון 4 – הפקדה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (4, 'deposit', 5000.00, NULL, NULL);");

    // חשבון 5 – משיכה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (5, 'withdrawal', 1200.00, NULL, NULL);");

    // חשבון 6 – הלוואה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (6, 'loan', 22000.00, 5.2, 36);");

    // חשבון 7 – הפקדה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (7, 'deposit', 3200.50, NULL, NULL);");

    // חשבון 8 – משיכה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (8, 'withdrawal', 450.00, NULL, NULL);");

    // חשבון 9 – הלוואה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (9, 'loan', 8000.00, 3.9, 18);");

    // חשבון 10 – הפקדה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (10, 'deposit', 900.00, NULL, NULL);");

    // חשבון 11 – משיכה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (11, 'withdrawal', 300.00, NULL, NULL);");

    // חשבון 12 – הלוואה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (12, 'loan', 30000.00, 6.1, 48);");

    // חשבון 13 – הפקדה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (13, 'deposit', 1250.75, NULL, NULL);");

    // חשבון 14 – משיכה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (14, 'withdrawal', 650.00, NULL, NULL);");

    // חשבון 15 – הלוואה
    runQuery("INSERT INTO Actions (accountNumber, actionType, amount, interest, payments) VALUES (15, 'loan', 12000.00, 4.0, 24);");

}

console.log("Starting init DB");

// openDb().then((db) => {
//     initDbSchema(db);
//     console.log("Done init DB");
// })

generateSampleData();