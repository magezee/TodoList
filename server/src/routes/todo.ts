import { Context } from 'koa'
import Router from 'koa-router'

import TodoService from '../services/todo'      // 拿到对应操作数据库的方法
import { StatusCode } from '../utils/enum'      // 拿到设定的返回状态码
import createRes from '../utils/response'       // 拿到设定的加工返回数据方法

const todoService = new TodoService()
const todoRouter = new Router({
    prefix: '/api/todos'     // 设定统一的路由前缀
})    

todoRouter
    // 关键字查找todo
    .get('/search', async (ctx: Context) => {
        console.log(ctx.query)
        const { userId, query } = ctx.query
        try {
            const data = await todoService.searchTodo(userId, query)
            console.log(data)
            if(data) {
                createRes({ ctx, data })  // 将拿到的返回数据传入再处理方法
            }
        } catch(error) {
            createRes({ctx, errorCode: 1, msg: error.message})    // 自定义errorCode
        }    
    })

    // 根据动态路由获取到不同user的所有todo列表
    .get('/:userId', async (ctx: Context) => {
        const userId = ctx.params.userId    // 获取到附在url中的userId内容 
        try {
            const data = await todoService.getAllTodos(userId)
            if(data) {
                createRes({ ctx, data })
            }
        } catch(error) {
            createRes({ ctx, errorCode: 1, msg: error.message })
        }
    })

    // 更改todo状态
    .put('/status', async (ctx: Context) => {
        const payload = ctx.request.body    // 获取发送过去的请求数据
        const { todoId } = payload
        try {
            const data = await todoService.updateTodoStatus(todoId)
            if(data) {
                createRes({ ctx, statusCode: StatusCode.Accepted })
            } 
        } catch(error) {
            createRes({ ctx, errorCode: 1, msg: error.message })
        }
    })

    // 更改todo内容
    .put('/content', async (ctx: Context) => {
        const payload = ctx.request.body
        const { todoId, content } = payload
        try {
            const data = await todoService.updataTodoContent(todoId, content)
            if(data) {
                createRes({ ctx, statusCode: StatusCode.Accepted })
            }
        } catch(error) {
            createRes({ ctx, errorCode: 1, msg: error.message })
        }
    })

    // 添加todo
    .post('/', async (ctx: Context) => {
        const payload = ctx.request.body
        const { userId, content } = payload
        try {
            const data = await todoService.addTodo(userId, content)
            if(data) {
                createRes({ ctx, statusCode: StatusCode.Created, data })
            }
        } catch(error) {
            createRes({ ctx, errorCode: 1, msg: error.message })
        }
    })

    // 删除todo
    .delete('/:todoId', async (ctx:Context) => 
    {   
        const todoId = ctx.params.todoId
        try {
            const data = await todoService.deleteTodo(todoId)
            if(data) {
                createRes({ ctx, statusCode: StatusCode.NoContent })
            }
        } catch(error) {
            createRes({ctx, errorCode:1, msg: error.message})
        }
    })

export default todoRouter 