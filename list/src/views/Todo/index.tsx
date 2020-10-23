import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Empty, Input } from 'antd';

import { ModalType } from '../../common/enum';

import { AppStore } from '../../store';
import {
    addTodo,
    deleteTodo,
    fetchTodo,
    searchTodo,
    updateTodoContent,
    updateTodoStatus,
} from '../../store/todo/actions';
import { keepLogin, logout } from '../../store/user/actions';
import { LocalStorage } from '../../utils';

const mapState = ({ todo, user }: AppStore) => ({
    todo,
    user,
});

const mapDispatch = {
    logout,
    keepLogin,
    addTodo,
    deleteTodo,
    fetchTodo,
    searchTodo,
    updateTodoContent,
    updateTodoStatus,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ITodoProps extends PropsFromRedux, RouteComponentProps { }
const Search = Input.Search;       // antD的类型

const Todo: FC<ITodoProps> = ({
    history,
    todo,
    user,
    logout,
    keepLogin,
    deleteTodo,
    updateTodoContent,
    updateTodoStatus,
    fetchTodo,
    addTodo,
    searchTodo,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [status, setStatus] = useState(false);
    const [content, setContent] = useState('');
    const [modalType, setModalType] = useState('');
    const [todoId, setTodoId] = useState('');

    // 判断登入状态
    useEffect(() => {
        const userId = LocalStorage.get('userId');
        const username = LocalStorage.get('username');
        if (userId && username) {
            if (user.userId) {
                fetchTodo(user.userId);
            } else {
                keepLogin({ userId, username, errMsg: '' });
            }
        } else {
            history.push('/');
        }
    }, [user]);

    const onToggleStatus = (flag: boolean) => {
        setStatus(flag);
    };
    const onAdd = (content: string) => {
        addTodo(user.userId, content);
        setStatus(false);
    };
    const onUpdateContent = (todoId: string, content: string) => {
        updateTodoContent(todoId, content);
    };
    const onDelete = (todoId: string) => {
        deleteTodo(todoId);
    };
    const onUpdateStatus = (todoId: string) => {
        updateTodoStatus(todoId);
    };
    const onSearch = (query: string) => {
        searchTodo(user.userId, query);
    };
    const onClose = () => {
        setShowModal(false);
    };
    const onShowModal = (type: ModalType, todoId?: string, content?: string) => {
        setShowModal(true);
        if (type === ModalType.Add) {
            setModalTitle('新增待办事项');
            setContent('');
            setModalType(ModalType.Add);
        }
        if (type === ModalType.Edit) {
            setModalTitle('编辑待办事项');
            setModalType(ModalType.Edit);
            setContent(content!);
            setTodoId(todoId!);
        }
    };

    return (
        <div>
            <div>
                <span>Hello, {user.username}</span>
                <Button type="ghost" size="small" onClick={logout}>
                    退出
                </Button>
            </div>
        </div>
        
    )
}

export default connector(Todo) 