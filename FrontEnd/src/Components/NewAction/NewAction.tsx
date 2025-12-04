import { useEffect, useState } from "react";
import { apiCreateAction } from "../../services/clientApi";
import "./NewAction.css";

interface NewActionFormProps {
  accountNumber?: number;
}

export function NewActionForm({ accountNumber }: NewActionFormProps) {
  const [accountNumberInput, setAccountNumberInput] = useState<string>(
    accountNumber ? String(accountNumber) : ""
  );
  const [actionType, setActionType] =
    useState<"withdrawal" | "deposit" | "loan">("deposit");
  const [amount, setAmount] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [payments, setPayments] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (accountNumber) {
      setAccountNumberInput(String(accountNumber));
    }
  }, [accountNumber]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const accountNum = Number(accountNumberInput);
    if (!accountNumberInput || Number.isNaN(accountNum) || accountNum <= 0) {
      setError("Account number must be a positive integer");
      return;
    }

    const amountNum = Number(amount);
    if (!amount || Number.isNaN(amountNum) || amountNum <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    const payload: any = {
      actionType,
      amount: amountNum,
    };

    if (actionType === "loan") {
      const interestNum = Number(interest);
      const paymentsNum = Number(payments);

      if (!interest || Number.isNaN(interestNum) || interestNum <= 0) {
        setError("Interest must be a positive number for a loan");
        return;
      }

      if (
        !payments ||
        !Number.isInteger(paymentsNum) ||
        paymentsNum <= 0
      ) {
        setError("Payments must be a positive integer for a loan");
        return;
      }

      payload.interest = interestNum;
      payload.payments = paymentsNum;
    }

    try {
      setLoading(true);
      await apiCreateAction(accountNum, payload);
      setSuccess("Action created successfully");

      if (!accountNumber) {
        setAccountNumberInput("");
      }
      setAmount("");
      setInterest("");
      setPayments("");
      setActionType("deposit");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error ?? "Failed to create action");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="new-action-container">
      <h2 className="new-action-title">New action</h2>

      {error && (
        <div className="new-action-message new-action-message--error">
          {error}
        </div>
      )}
      {success && (
        <div className="new-action-message new-action-message--success">
          {success}
        </div>
      )}

      <form className="new-action-form" onSubmit={handleSubmit}>
        <div className="new-action-field">
          <label className="new-action-label">
            Account number
            <input
              type="number"
              className="new-action-input"
              value={accountNumberInput}
              onChange={(e) => setAccountNumberInput(e.target.value)}
              min={1}
              placeholder="Enter account number"
            />
          </label>
          {accountNumber && (
            <p className="new-action-hint">
              Loaded from selected account ({accountNumber}), you can change it if needed.
            </p>
          )}
        </div>

        <div className="new-action-field">
          <label className="new-action-label">
            Type
            <select
              className="new-action-input new-action-select"
              value={actionType}
              onChange={(e) =>
                setActionType(
                  e.target.value as "withdrawal" | "deposit" | "loan"
                )
              }
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="loan">Loan</option>
            </select>
          </label>
        </div>

        <div className="new-action-field">
          <label className="new-action-label">
            Amount
            <input
              type="number"
              className="new-action-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
              step="0.01"
              placeholder="Enter amount"
            />
          </label>
        </div>

        {actionType === "loan" && (
          <>
            <div className="new-action-field">
              <label className="new-action-label">
                Interest
                <input
                  type="number"
                  className="new-action-input"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  min={0}
                  step="0.01"
                  placeholder="Interest %"
                />
              </label>
            </div>

            <div className="new-action-field">
              <label className="new-action-label">
                Payments
                <input
                  type="number"
                  className="new-action-input"
                  value={payments}
                  onChange={(e) => setPayments(e.target.value)}
                  min={1}
                  step="1"
                  placeholder="Number of payments"
                />
              </label>
            </div>
          </>
        )}

        <button
          type="submit"
          className="new-action-submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save action"}
        </button>
      </form>
    </div>
  );
}
