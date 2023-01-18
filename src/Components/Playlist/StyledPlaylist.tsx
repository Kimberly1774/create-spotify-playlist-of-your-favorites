import styled from "styled-components";

export const StyledPlaylist = styled.div`
  .ant-list {
    padding-bottom: ${props => props.theme.spacing.s};
  }
  .ant-list-items {
    height: 304px;
    overflow-y: auto;
  }
  .ant-list-item {
    padding: ${props => props.theme.spacing.xxs} 0;
  }
`;
