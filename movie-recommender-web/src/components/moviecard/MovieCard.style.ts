import styled from "styled-components";

export const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: grid;
  place-content: center;
  transform: translateY(100%);
  padding: 10px;
  background-image: linear-gradient(to bottom, transparent, black);
  transition: all 0.2s ease-in;
`;

export const MovieCardContainer = styled.div`
  width: 100%;
  max-width: 180px;
  min-height: 200px;
  background: green;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover ${MovieInfo} {
    transform: translateY(0);
  }
`;

export const MovieImage = styled.img`
  height: 100%;
  width: auto;
`;

export const MovieTitle = styled.p`
  font-size: 18px;
  color: #eee;
`;
