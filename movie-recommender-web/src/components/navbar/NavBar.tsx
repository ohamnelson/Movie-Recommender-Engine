import { FC, ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar: FC = (): ReactElement => {
  return (
    <>
      <header className="mb-2">
        <div className="logoDiv">
          <span>
            <Link to="/">OhamTheExplorer</Link>
          </span>
        </div>
      </header>
    </>
  );
};

export default NavBar;
