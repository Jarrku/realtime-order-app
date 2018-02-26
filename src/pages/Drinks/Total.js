import React from "react";
import styled from "styled-components";
import { Row, Col, Button } from "antd";

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const Total = ({ total, resetState }) => (
  <Row>
    <CenteredCol span={12}>
      <h1> TOTAAL: {total} </h1>
    </CenteredCol>
    <Col span={6}>
      <Button type="danger" size="large" onClick={resetState}>
        Reset!
      </Button>
    </Col>
  </Row>
);

export default Total;
