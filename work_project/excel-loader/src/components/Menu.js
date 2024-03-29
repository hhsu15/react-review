import './Menu.css';

function Menu() {
  return (
    <div className="sidebar">
      <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Customers</a>
          </li>
        </ul>
        <p class="menu-label">Administration</p>
        <ul class="menu-list">
          <li>
            <a>Team Settings</a>
          </li>
          <li>
            <a>Invitations</a>
          </li>
          <li>
            <a>Cloud Storage Environment Settings</a>
          </li>
          <li>
            <a>Authentication</a>
          </li>
        </ul>
        <p class="menu-label">Transactions</p>
        <ul class="menu-list">
          <li>
            <a>Payments</a>
          </li>
          <li>
            <a>Transfers</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Menu;
