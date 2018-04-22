import React, { Fragment } from "react";
import { Row } from "antd";
import NumberInput from "../../components/NumberInput";
import _ from "lodash";

// save initialstate when loading === true, reuse this to reset form, same principle as before.
const enrichWithAmount = items => items.map(item => ({ ...item, amount: 0 }));

const stringSort = (a, b) => {
  const x = a.name.toLowerCase();
  const y = b.name.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
};

export default class Entrance extends React.Component {
  componentDidUpdate({ menuReq }) {
    const { loading, menu } = this.props.menuReq;
    if (!loading && this.initialItemState === null) {
      const items = enrichWithAmount(menu);

      const kinderen = items.filter(({ category }) => category && category.name === "Kind").sort(stringSort);
      const volw = items.filter(({ category }) => category && category.name === "Volwassene").sort(stringSort);
      const rest = items.filter(({ category }) => !category);

      this.initialItemState = {
        kinderen,
        volw,
        rest
      };

      this.resetState();
    }
  }

  initialItemState = null;

  resetState() {
    const cloned = _.cloneDeep(this.initialItemState);
    this.setState({ items: cloned });
  }

  state = {
    items: {
      kinderen: null,
      volw: null,
      rest: null
    }
  };

  render() {
    const { kinderen, volw, rest } = this.state.items;
    const hasData = kinderen || volw || rest;

    return (
      <Fragment>
        {hasData && (
          <Fragment>
            <Section list={kinderen} span={6} title="Kind" />
            <Section list={volw} span={6} title="Volwassene" />
            <Section list={rest} span={6} title="Overig" />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const Section = ({ list, span, title }) => (
  <Fragment>
    <h2>{title}</h2>
    <Row>
      {list.map(item => (
        <NumberInput
          span={span}
          key={item.id}
          name={item.id}
          amount={0}
          label={item.name}
          onChange={this.onChange}
          onDecrement={() => console.log("Decrementing...")}
          onIncrement={() => console.log("Incrementing...")}
        />
      ))}
    </Row>
  </Fragment>
);
