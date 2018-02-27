import React, { Fragment } from "react";
import { Row, Col, Button } from "antd";

import Total from "../components/Total";
import NumberInput from "../components/NumberInput";

const initialState = {
  pils: {
    label: "Pils/Hoegaarden",
    price: 2,
    amount: 0
  },
  frisdrank: {
    label: "Frisdrank",
    price: 2,
    amount: 0
  },
  koffie: {
    label: "Koffie/Thee",
    price: 2,
    amount: 0
  },
  zwaar: {
    label: "Zware bieren",
    price: 3,
    amount: 0
  },
  oudercomite: {
    label: "Oudercomité",
    price: 2,
    amount: 0
  },
  verwenkoffie: {
    label: "Verwenkoffie",
    price: 3,
    amount: 0
  },
  palm: {
    label: "Palm",
    price: 2.2,
    amount: 0
  },
  wijnGlas: {
    label: "Glas Wijn",
    price: 3,
    amount: 0
  },
  coupe: {
    label: "Coupe DB/Caramel",
    price: 3,
    amount: 0
  },
  aperitief: {
    label: "Porto/Sherry",
    price: 2.8,
    amount: 0
  },
  wijnFles: {
    label: "Fles Wijn",
    price: 16,
    amount: 0
  },
  gebak: {
    label: "Gebak",
    price: 1.8,
    amount: 0
  }
};

const stateKeys = Object.keys(initialState);

export default class Drinks extends React.Component {
  state = {
    value: 0,
    ...initialState
  };

  onChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    console.log(currentTarget.value);

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        amount: parseInt(value, 10)
      }
    }));
  };

  resetState = () => {
    this.setState({ ...initialState });
  };

  calculatePrice = () => {
    return stateKeys.reduce(
      (total, key) => total + this.state[key].amount * this.state[key].price,
      0
    );
  };

  onIncrement = name => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        amount: prevState[name].amount + 1
      }
    }));
  };

  onDecrement = name => {
    this.setState(prevState => {
      const amount =
        prevState[name].amount > 0 ? prevState[name].amount - 1 : 0;

      return {
        [name]: {
          ...prevState[name],
          amount
        }
      };
    });
  };

  render() {
    const total = this.calculatePrice();
    return (
      <Fragment>
        <Row>
          <Total span={12} total={total} />
          <Col span={6}>
            <Button type="danger" size="large" onClick={this.resetState}>
              Reset!
            </Button>
          </Col>
        </Row>
        <Total total={total} resetState={this.resetState} />
        <Row type="flex" justify="space-between">
          {stateKeys.map(key => (
            <NumberInput
              span={8}
              key={key}
              stateKey={key}
              amount={this.state[key].amount}
              label={this.state[key].label}
              onChange={this.onChange}
              onDecrement={() => this.onDecrement(key)}
              onIncrement={() => this.onIncrement(key)}
            />
          ))}
        </Row>
      </Fragment>
    );
  }
}
