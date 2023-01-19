import styled from "styled-components";

export const StyledCreatePlaylist = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.xl};

  .ant-input-number-lg {
    .ant-input-number-handler-up-inner, .ant-input-number-handler-down-inner {
      font-size: ${props => props.theme.fontSize.xs} !important;
    }
    .ant-input-number-handler-wrap {
      opacity: 1;
    }
  }

  .ant-typography {
    color: #333;
  }
`;