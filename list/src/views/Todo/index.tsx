import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Empty, Input } from 'antd';

import { ModalType } from '../../common/enum';
import ModalForm from '../../components/FormModal';
import TodoItem from '../../components/TodoItem';
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
import styles from './index.module.scss';

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
const Search = Input.Search;       // antD中输入表单的搜索样式类型

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

    // 更改代办事项的完成状态
    const onToggleStatus = (flag: boolean) => {
        setStatus(flag);
    };

    // 发送不同类型的请求
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
        <div className={styles.wrapper}>
            {/* 个人信息 */}
            <div className={styles.user}>
                <span>Hello, {user.username}</span>
                <Button type="ghost" size="small" onClick={logout}>
                    退出
                </Button>
            </div>
            {/* 查询和新增事项列表 */}
            <div className={styles.queryBar}>
                <Search
                    placeholder="输入要查询的内容"
                    onSearch={(value) => onSearch(value)}
                />
                <Button
                    type="primary"
                    onClick={() => onShowModal(ModalType.Add)}
                    className={styles.newTodo}
                >
                    新增
                </Button>
            </div>
            {/* 事项列表内容 */}
            <div className={styles.main}>
                {/* 切换状态 */}
                <ul className={styles.nav}>
                    <li className={status ? '' : styles.active} onClick={() => onToggleStatus(false)}>
                        <i className={`${styles.dot} ${styles.pending}`} />
                        未完成
                    </li>
                    <li className={status ? styles.active : '' } onClick={() => onToggleStatus(true)}>
                        <i className={`${styles.dot} ${styles.resolved}`} />
                        已完成
                    </li>
                </ul>
                {/* 对应状态的内容 */}
                <ul className={styles.list}>
                    {todo.length? (
                        todo
                            .filter((v) => v.status === status)     /* 渲染状态相同的列表 */
                            .map((v) => (
                                <TodoItem 
                                    key={v._id}
                                    content={v.content}
                                    id={v._id}
                                    type={modalType}
                                    finished={status}
                                    onShowModal={onShowModal}
                                    onDelete={onDelete}
                                    onUpdateStatus={onUpdateStatus}
                                />
                            ))
                    ) : (
                        <Empty className={styles.noData} />
                    )}
                </ul>
            </div>
            {/* 弹窗 */}
            <ModalForm
                todoId={todoId}
                modalType={modalType}
                content={content}
                visible={showModal}
                title={modalTitle}
                onClose={onClose}
                onAdd={onAdd}
                onUpdateContent={onUpdateContent}
            />
        </div>
        
    )
}

export default connector(Todo) 