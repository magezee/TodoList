import User from '../db/models/user'

export default class UserService {
    // 用户注册
    public async addUser(usr: string, psd: string) {
        try {
            const user = new User({
                usr,
                psd,
                todos: []      // 刚注册的用户没有todo事项
            })
            return await user.save()
        } catch(error) {
            if(error.code = 11000){     // 11000错误码表示唯一属性的值冲突
                  throw new Error('用户名已存在')
            }   else {
                throw error
            }
        } 
    }

    // 用户登入
    public async validUser(usr: string, psd: string) {
        try {
            const user = await User.findOne({ usr })
            if(!user) {     // 查询用户
                throw new Error('用户不存在')  
            }
            if(psd === user.psd) {      // 校验密码
                return user
            }
            throw new Error('密码错误')
        } catch(error) {
            throw new Error(error.message)
        }
    }
}