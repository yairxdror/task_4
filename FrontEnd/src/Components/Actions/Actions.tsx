import { useEffect, useState } from "react";
import { apiGetActionsByAccount } from "../../services/clientApi";
import "./Actions.css";

interface AccountActionsListProps {
  accountNumber: number;
  onAddAction?: (accountNumber: number) => void;
}

export function AccountActionsList({
  accountNumber,
  onAddAction,
}: AccountActionsListProps) {
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActions() {
      try {
        if (!accountNumber || Number.isNaN(accountNumber)) {
          setError("Invalid account number");
          setActions([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const data = await apiGetActionsByAccount(accountNumber);
        setActions(data);
      } catch (e: any) {
        console.error(e);
        setError("An error occurred while loading the actions");
      } finally {
        setLoading(false);
      }
    }

    loadActions();
  }, [accountNumber]);

  if (loading) {
    return (
      <div className="actions-container actions-state">
        Loading actions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="actions-container actions-state actions-state--error">
        {error}
      </div>
    );
  }

  if (!actions.length) {
    return (
      <div className="actions-container">
        <div className="actions-header">
          <h2 className="actions-title">
            Actions for account {accountNumber}
          </h2>
          {onAddAction && (
            <button
              type="button"
              className="actions-add-button"
              onClick={() => onAddAction(accountNumber)}
            >
              + New action
            </button>
          )}
        </div>
        <div className="actions-state">No actions to display for this account</div>
      </div>
    );
  }

  return (
    <div className="actions-container">
      <div className="actions-header">
        <h2 className="actions-title">
          Actions for account {accountNumber}
        </h2>
        {onAddAction && (
          <button
            type="button"
            className="actions-add-button"
            onClick={() => onAddAction(accountNumber)}
          >
            + New action
          </button>
        )}
      </div>

      <div className="actions-table-wrapper">
        <table className="actions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Interest</th>
            <th>Payments</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action: any) => (
            <tr key={action.id}>
              <td>{action.id}</td>
              <td>{action.actionType}</td>
              <td>{action.amount}</td>
              <td>{action.actionDate}</td>
              <td>{action.interest != null ? action.interest : "-"}</td>
              <td>{action.payments != null ? action.payments : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div >
  );
}
