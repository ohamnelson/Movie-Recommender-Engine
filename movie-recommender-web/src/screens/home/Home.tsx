import { FC, ReactElement } from "react";
import SearchForm from "../../components/SearchForm";

const Home: FC = (): ReactElement => {
  return (
    <>
      <div className="hero">
        <h1 className="hero-text-primary my-2">Find Movies Similar to ...</h1>
        <div className="hero-search-box">
          <SearchForm />
        </div>
      </div>
    </>
  );
};

export default Home;
