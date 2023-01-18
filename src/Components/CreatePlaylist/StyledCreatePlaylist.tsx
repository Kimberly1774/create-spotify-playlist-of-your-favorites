import styled from "styled-components";

export const StyledCreatePlaylist = styled.div`
  display: flex;
  justify-content: space-around;

  .ant-input-number .ant-input-number-input {
    font-size: 24px;
    font-weight: 600;
  }
  .ant-input-number-lg {
    ${props => props.theme.shadow.medium};

    .ant-input-number-input {
      vertical-align: middle;
    }

    .ant-input-number-input-wrap {
      font-weight: 600;
      width: 68px;
      text-align-last: center;
    }
    .ant-input-number-handler-up-inner, .ant-input-number-handler-down-inner {
      font-size: ${props => props.theme.fontSize.xs} !important;
    }
    .ant-input-number-handler-wrap {
      border-inline-start: 0px none #ffffff;
      opacity: 1;
    }
  }
`;