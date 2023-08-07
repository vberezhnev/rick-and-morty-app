import styled from "styled-components";

export const Block = styled.div<{ $margin?: string }>`
  margin: ${(props) => props.$margin || "0px"};
`;
