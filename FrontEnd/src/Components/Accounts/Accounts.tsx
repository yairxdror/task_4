import { useEffect, useState } from "react";
import { apiGetAllAccounts } from "../../services/clientApi";
import "./Accounts.css";

interface AccountsListProps {
  onSelectAccount?: (accountId: number) => void;
}

export function AccountsList({ onSelectAccount }: AccountsListProps) {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccounts() {
      try {
        setLoading(true);
        setError(null);

        const data = await apiGetAllAccounts();
        setAccounts(data);
      } catch (e: any) {
        console.error(e);
        setError("An error occurred while loading the accounts");
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  if (loading) {
    return (
      <div className="accounts-container accounts-loading">
        Loading accounts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="accounts-container accounts-error">
        {error}
      </div>
    );
  }

  if (!accounts.length) {
    return (
      <div className="accounts-container accounts-empty">
        No accounts to display
      </div>
    );
  }

  return (
    <div className="accounts-container">
      <h2 className="accounts-title">Account list</h2>
      <ul className="accounts-list">
        {accounts.map((acc: any) => (
          <li
            key={acc.id}
            className="account-item"
            onClick={() => onSelectAccount?.(acc.id)}
          >
            <div className="account-main">
              <span>
                <span className="account-label">Account number:</span>
                <span className="account-value">{acc.id}</span>
              </span>
              <span>
                <span className="account-label">Customer name:</span>
                <span className="account-value">{acc.fullName}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
