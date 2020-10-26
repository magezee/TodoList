import Todo from '../db/models/todo'
import User from '../db/models/user'

export default class TodoService {  
    // 增加todo
    public async addTodo(userId: string, content: string) {
        const todo = new Todo({content})   // 实例化model，将拿到的content作为一条todo数据的内容
        try {
            const res = await todo.save()               // 将该条数据存储进集合
            const user = await User.findById(userId)    // 通过userId查找到指定的user
            user?.todos.push(res.id)                    // 将添加todo数据的主键添加到user数据对象的todos数组中 ?表示user可为null
            await user?.save()                          // 将修改的user数据存储覆盖原数据
            return res
        } catch(error) {
            throw new Error('新增失败')
        }
    }

    // 删除todo
    public async deleteTodo(todoId: string) {
        try {
            return await Todo.findByIdAndDelete(todoId)
        } catch(error) {
            throw new Error('删除失败')
        }
    }
    
    // 获取用户的所有todo
    public async getAllTodos(userId: string) {
        try {
            const res = await User.findById(userId).populate('todos')
            return res?.todos
        } catch(error) {
            throw new Error('获取失败')
        }
    }

    // 更改todo的状态
    public async updateTodoStatus(todoId: string) {
        try {
            const oldRecord = await Todo.findById(todoId)
            const record = await Todo.findByIdAndUpdate(todoId, {
                status: !oldRecord?.status      // 将todo的status状态取反
            })
            return record
        } catch(error) {
            throw new Error('更新状态失败')
        }
    }

    // 更改todo的内容
    public async updataTodoContent(todoId: string, content: string) {
        try {
            return await Todo.findByIdAndUpdate(todoId, {content})
        } catch {
            throw new Error('更新内容失败')
        }
    }

    // 通过关键字搜索todo
    public async searchTodo(userId: string, query: string) {
        try {
            return await User.findById(userId).populate({
                path: 'todos',
                match: { content: { $regex: new RegExp(query), $options: 'i' } },
            })
        } catch(error) {
            console.log(error)
            throw new Error('查询失败')
        }
    }

}