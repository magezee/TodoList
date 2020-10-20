import React, { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router"; // TS需要引入传入的props类型
import { connect, ConnectedProps } from "react-redux"; // TS需要引入传入的props类型

import { LocalStorage } from "../../utils";
import { AppStore } from "../../store";
import { keepLogin } from "../../store/user/action";

// 对redux的映射
const mapState = ({ user }: AppStore) => ({
  user,
});
const mapDispatch = {
  keepLogin,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const Home: FC<RouteComponentProps> = () => {
  return <div></div>;
};

export default Home;
