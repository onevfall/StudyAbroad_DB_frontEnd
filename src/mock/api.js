import { Failed } from '@element-plus/icons-vue';
import {user_table} from '../DemoData/login'

export default {
    'post|/api1111/login': option => {
        var {user_id,user_password}=JSON.parse(option.body)
        for(let i=0;i<user_table.length;++i){
            if(user_id==user_table[i].user_id&&user_password==user_table[i].user_password){
                return {
                    status: true,
                    message: 'success',
                    data:user_table[i]
                };
            }
        }
        return {
            status: false,
            message:'failed',
            data:{
            }
        }
    }
}