import { FC, ReactElement } from "react";
import SearchForm from "../../components/searchform/SearchForm";
import { Outlet } from "react-router-dom";

const Home: FC = (): ReactElement => {
  return (
    <>
      <div className="hero">
        <h1 className="hero-text-primary my-1">Find Movies Similar to ...</h1>
        <div className="hero-search-box">
          <SearchForm />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
