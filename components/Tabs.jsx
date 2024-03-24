import styled from "styled-components";

/* eslint-disable react/jsx-key */
export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <StyledTabs>
      {tabs.map((tabName) => (
        <StyledTab
          key={tabName}
          onClick={() => {
            onChange(tabName);
          }}
          activeTab={tabName === activeTab}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}

const StyledTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const StyledTab = styled.span`
  font-size: 1.5rem;
  ${(props) =>
    props.activeTab
      ? `color: #0f172a; border-bottom: 2px solid #0f172a`
      : `color: #9ca3af`}
`;
