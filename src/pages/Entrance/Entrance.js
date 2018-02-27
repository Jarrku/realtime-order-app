import React, { Fragment } from "react";
import { Row } from "antd";
import NumberInput from "../../components/NumberInput";

// save initialstate when loading === true, reuse this to reset form, same principle as before.

const Entrance = ({ menuReq }) => {
  const { menu, loading } = menuReq;
  console.log(menu);
  return (
    <Fragment>
      <Row>Top Row</Row>
      {!loading && (
        <Row type="flex" justify="space-between">
          {menu.map(item => (
            <NumberInput
              span={8}
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
      )}
    </Fragment>
  );
};

export default Entrance;
