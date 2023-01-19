import styled from "styled-components";

export const StyledDisplayPlaylist = styled.div`
  margin: 36px auto;
  max-width: 1600px;

  .ant-list-grid .ant-col>.ant-list-item {
    padding: 0px 0px ${props => props.theme.spacing.l} 0px;
  }
`;