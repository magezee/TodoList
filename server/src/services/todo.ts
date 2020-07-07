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
    
    public async getAllTodos(userId: string) {
        try {
            const res = await User.findById(userId).populate('todos')
        } catch {
            
        }
    }




}