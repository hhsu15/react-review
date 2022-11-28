import logo from '../images/nav_logo.png'; //

function NavBar() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} width="112" height="28" alt="lseg logo" />
          </a>

          <a
            href="/#"
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
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
              <div class="buttons">
                {/* <a href="/#" class="button is-primary">
                  <strong>Sign up</strong>
                </a> */}
                <a href="/#" class="button is-light">
                  Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
