import { FC, ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar: FC = (): ReactElement => {
  return (
    <>
      <header className="mb-2">
        <div className="logoDiv">
          <span>
            <Link to="/">Logo</Link>
          </span>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/">All Movies</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
