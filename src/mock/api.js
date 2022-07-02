import { Failed } from '@element-plus/icons-vue';
import {user_table} from '../DemoData/login'

export default {
    'post|/api/login': option => {
        var {user_phone,user_password}=JSON.parse(option.body)
 
        for(let i=0;i<user_table.length;++i){
            if(user_phone==user_table[i].user_phone&&user_password==user_table[i].user_password){
                return JSON.stringify({
                    state: true,
                    message: 'success',
                    data:user_table[i]
                });
            }
        }
        return JSON.stringify({
            state: false,
            message:'failed',
            data:{
            }
        })
    }
}