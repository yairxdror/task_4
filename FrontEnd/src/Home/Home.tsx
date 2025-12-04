import { useState } from "react";
import { AccountsList } from "../Components/Accounts/Accounts";
import "./Home.css";
import { AccountActionsList } from "../Components/Actions/Actions";
import { NewActionForm } from "../Components/NewAction/NewAction";

type ViewMode = "accounts" | "actions";
type ActiveTab = "list" | "new";

function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("accounts");
  const [activeTab, setActiveTab] = useState<ActiveTab>("list");
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [accountInput, setAccountInput] = useState<string>("");

  const handleShowAccounts = () => {
    setViewMode("accounts");
  };

  const handleShowActionsList = () => {
    setViewMode("actions");
    setActiveTab("list");
  };

  const handleShowNewAction = () => {
    setViewMode("actions");
    setActiveTab("new");
  };

  const handleSelectAccount = (accountId: number) => {
    setSelectedAccount(accountId);
    setAccountInput(String(accountId));
    setViewMode("actions");
    setActiveTab("list");
  };

  const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccountInput(value);

    const num = Number(value);
    if (!value || Number.isNaN(num) || num <= 0) {
      setSelectedAccount(null);
    } else {
      setSelectedAccount(num);
    }
  };

  const handleAddActionForAccount = (accountId: number) => {
    setSelectedAccount(accountId);
    setAccountInput(String(accountId));
    setViewMode("actions");
    setActiveTab("new");
  };

  const currentVisualTab: "accounts" | "actions" | "newAction" =
    viewMode === "accounts"
      ? "accounts"
      : activeTab === "list"
      ? "actions"
      : "newAction";

  return (
    <div className="home-container">
      <h1 className="home-title">Bank account system</h1>

      <div className="home-tabs">
        <span
          className={`home-tabs-indicator home-tabs-indicator--${currentVisualTab}`}
        />

        <button
          type="button"
          className={`home-tab-button ${
            viewMode === "accounts" ? "home-tab-button--active" : ""
          }`}
          onClick={handleShowAccounts}
        >
          All accounts
        </button>

        <button
          type="button"
          className={`home-tab-button ${
            viewMode === "actions" && activeTab === "list"
              ? "home-tab-button--active"
              : ""
          }`}
          onClick={handleShowActionsList}
        >
          Account actions
        </button>

        <button
          type="button"
          className={`home-tab-button ${
            viewMode === "actions" && activeTab === "new"
              ? "home-tab-button--active"
              : ""
          }`}
          onClick={handleShowNewAction}
        >
          New action
        </button>
      </div>

      <div className="home-content">
        {viewMode === "accounts" && (
          <AccountsList onSelectAccount={handleSelectAccount} />
        )}

        {viewMode === "actions" && activeTab === "list" && (
          <>
            <div className="home-account-input">
              <label className="home-account-input-label">
                Account number:
                <input
                  type="number"
                  min={1}
                  className="home-account-input-field"
                  value={accountInput}
                  onChange={handleAccountInputChange}
                  placeholder="Enter account number"
                />
              </label>
              <p className="home-account-input-hint">
                You can either select an account from the list, or type its number here.
              </p>
            </div>

            {selectedAccount ? (
              <AccountActionsList
                accountNumber={selectedAccount}
                onAddAction={handleAddActionForAccount}
              />
            ) : (
              <p className="home-placeholder">
                Select an account from the list or enter its number to view actions.
              </p>
            )}
          </>
        )}

        {viewMode === "actions" && activeTab === "new" && (
          <NewActionForm accountNumber={selectedAccount ?? undefined} />
        )}
      </div>
    </div>
  );
}

export default Home;