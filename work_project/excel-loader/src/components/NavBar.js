import logo from '../images/nav_logo.png'; //
import { useState } from 'react';

function NavBar() {
  const [bugger, setBurger] = useState('');
  const toggle = currentState => {
    const valueMap = {
      false: '',
      true: 'is-active'
    };
    setBurger(valueMap[!currentState]);
  };
  return (
    <nav className="navbar" role="navigation" ariaLabel="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} width="112" height="28" alt="lseg logo" />
        </a>

        <a
          href="/#"
          role="button"
          className={`navbar-burger ${bugger}`}
          ariaLabel="menu"
          ariaExpanded="false"
          dataTarget="navbarBasicExample"
          onClick={() => toggle(bugger)}
        >
          <span ariaHidden="true"></span>
          <span ariaHidden="true"></span>
          <span ariaHidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${bugger}`}>
        <div className="navbar-start">
          <a href="/#" className="navbar-item">
            Compare Workbooks
          </a>

          <a href="/#" className="navbar-item">
            File Transformation
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="/#" className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              <a href="/#" className="navbar-item">
                About
              </a>
              <hr className="navbar-divider" />
              <a href="/#" className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            {/* <div class="buttons"> */}
            {/* <a href="/#" class="button is-primary">
                  <strong>Sign up</strong>
                </a> */}
            <a href="/#" class="navbar-item">
              Help
            </a>
            {/* </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
