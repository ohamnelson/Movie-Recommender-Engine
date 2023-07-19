import { FC, ReactElement, useEffect, useRef } from "react";

const SearchForm: FC = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      <form action="" className="search-form">
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="Start searching"
        />
      </form>
    </>
  );
};

export default SearchForm;
