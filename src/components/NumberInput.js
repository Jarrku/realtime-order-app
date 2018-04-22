import React from "react";
import styled from "styled-components";
import { Col, Button } from "antd";

const InputNumber = styled.input`
  font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  list-style: none;
  position: relative;
  padding: 4px 11px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  transition: all 0.3s;
  margin: 0;
  padding: 0;
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 90px;
  text-align: center;
`;

const PaddedCol = styled(Col)`
  padding: 20px 0;
`;

const PaddedButton = styled(Button)`
  width: 60px;
`;

const NumberInput = ({ amount, label, onChange, onIncrement, onDecrement, name, span }) => (
  <PaddedCol span={span}>
    <h4>{label}</h4>
    <div>
      <InputNumber type="number" value={amount} name={name} onChange={onChange} />
      <Button.Group size="large">
        <PaddedButton type="primary" icon="plus" onClick={onIncrement} />
        <PaddedButton type="danger" icon="minus" onClick={onDecrement} />
      </Button.Group>
    </div>
  </PaddedCol>
);

export default NumberInput;
