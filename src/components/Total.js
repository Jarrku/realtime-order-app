import React from "react";
import styled from "styled-components";
import { Col } from "antd";

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const Total = ({ span, total }) => (
  <CenteredCol span={span}>
    <h1> TOTAAL: {total} </h1>
  </CenteredCol>
);

export default Total;
