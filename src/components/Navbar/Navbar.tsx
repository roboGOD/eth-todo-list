import React from "react";
import { useWeb3Context } from "../../shared/Web3Context";

export default function Navbar() {
  const { account } = useWeb3Context();

  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        roboGOD | Todo List
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small>
            <a className="nav-link" href="#">
              <span id="account">{account}</span>
            </a>
          </small>
        </li>
      </ul>
    </nav>
  );
}
