import React, { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router"; // TS需要引入传入的props类型
import { connect, ConnectedProps } from "react-redux"; 			// TS需要引入传入的props类型

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

// 组合
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>		

const Home: FC<RouteComponentProps & PropsFromRedux> = ({
	history,
	user,
	keepLogin,
}) => {
	
	const [showLogin, setShowLogin] = useState(true);	// 根据状态决定显示登入还是注册按钮
	
	useEffect(() => {
		const userId = LocalStorage.get('userId');
		const username = LocalStorage.get('username');
		if (userId && username) {
			if (!user.userId) {
				keepLogin({ userId, username, errMsg: ''});
			} else {
				history.push('/todo');	// 登入状态下跳转列表页,相当于重定向
			}
		}
	},[user])

	const toggleForm = () => {
		setShowLogin(!showLogin);
	};

	return <div></div>;
};

export default connector(withRouter(Home));
