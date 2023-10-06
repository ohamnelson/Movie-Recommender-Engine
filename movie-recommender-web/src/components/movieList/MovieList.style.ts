import styled from "styled-components";

export const MovieListContainer = styled.div`
  height: 100px;
  min-width: 280px;
  width: 100%;
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
  row-gap: 40px;

  @media screen and (min-width: 550px) {
    gap: 30px;
  }

  @media screen and (min-width: 620px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
