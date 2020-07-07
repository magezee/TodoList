import Todo from '../db/models/todo'
import User from '../db/models/user'

export default class TodoService {
    
    // 增加todo
    public async addTodo(userId: string, content: string) {
        const todo = new Todo({content})   // 实例化model，将拿到的content作为一条todo数据的内容

        try {
            const res = await todo.save()
        }
        catch(error) {
            
        }
    }
}