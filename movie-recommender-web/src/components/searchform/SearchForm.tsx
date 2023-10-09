import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { ErrorMessage, SearchFormContainer } from "./SearchForm.style";

interface SearchFormProps {
  sendMovieToParent: (movie: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({
  sendMovieToParent,
}): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [movieName, setMovieName] = useState("");
  const [formIsValid, setFormIsValid] = useState(true);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const checkIfMovieNameIsEmpty = (movie: string) => {
    return movie.length === 0 || movie.trim().length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkIfMovieNameIsEmpty(movieName)) {
      setFormIsValid(false);
      return;
    }
    // console.log({ movieName });
    sendMovieToParent(movieName);
  };
  return (
    <>
      <SearchFormContainer
        onSubmit={handleSubmit}
        action=""
        className="search-form"
      >
        <input
          ref={inputRef}
          value={movieName}
          onChange={handleChange}
          type="text"
          className="search-input"
          placeholder="Enter the name of the movie"
        />
        {formIsValid === false && (
          <ErrorMessage>Please enter at least one character</ErrorMessage>
        )}
      </SearchFormContainer>
    </>
  );
};

export default SearchForm;
