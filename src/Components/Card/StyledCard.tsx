import styled from "styled-components";

export const StyledCard = styled.div`
  .ant-card {
    background: ${props => props.theme.color.bg};
    ${props => props.theme.shadow.medium};
  }  
  .ant-card-meta {
    margin-bottom: ${props => props.theme.spacing.xxxs};
    padding-bottom: ${props => props.theme.spacing.xs};
    border-block-end: 1px solid rgba(5, 5, 5, 0.06);
  }
  .ant-card-meta-avatar {
    padding-inline-end: ${props => props.theme.spacing.xs};
  }
  .ant-card-meta-title, .ant-card-head-title {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.6;
    max-height: 3.2;
  }
`;