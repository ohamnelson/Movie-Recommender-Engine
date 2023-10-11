import styled from "styled-components";

export const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: grid;
  place-content: center;
  font-weight: bold;
  transform: translateY(100%);
  padding: 25px;
  background-image: linear-gradient(to bottom, transparent, black 90%);
  transition: all 0.2s ease-in;
`;

export const MovieCardContainer = styled.div`
  width: 100%;
  max-width: 180px;
  height: 270px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: none;

  &:hover ${MovieInfo} {
    transform: translateY(0);
  }
`;

export const MovieImage = styled.img`
  height: auto;
  width: 100%;
`;

export const MovieTitle = styled.p`
  font-size: 18px;
  color: #eee;
`;
