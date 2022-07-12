import { Failed } from '@element-plus/icons-vue';
import { user_table } from '../DemoData/login';
import { formatterDate } from '@/utils/date';

export default {
    'post|/api111/login': option => {
        var { user_phone, user_password } = JSON.parse(option.body)

        for (let i = 0; i < user_table.length; ++i) {
            if (user_phone == user_table[i].user_phone && user_password == user_table[i].user_password) {
                return JSON.stringify({
                    state: true,
                    message: 'success',
                    data: user_table[i]
                });
            }
        }
        return JSON.stringify({
            state: false,
            message: 'failed',
            data: {
            }
        })
    },
    'post|/api111/register': option => {
        var { user_phone, user_password } = JSON.parse(option.body)

        for (let i = 0; i < user_table.length; ++i) {//遍历 防止手机号重复注册
            if (user_phone === user_table[i].user_phone) {
                return JSON.stringify({
                    state: false,
                    message: 'failed',
                    data: {
                    }
                });
            }
        }
        const t = new Date(val)
        user_table.push({
            user_id: 798370491,
            user_email: "",
            user_phone: user_phone,
            user_password: user_password,
            user_name: "ZhiYu",
            user_profile: "",
            user_createtime: formatterDate(t, 'yyyy-MM-dd hh:mm:ss'),
            user_birthday: "",
            user_gender: "",
            user_state: -1,
            user_signature: "",
            user_follower: 0,
            user_follows: 0,
            user_level: 1,
            user_coin: 0
        })
        return JSON.stringify({
            state: true,
            message: 'success',
            data: {
            }
        })
    },
    // 'get|/api/university/rank?rank_year=2021&tag=THE_rank&university_country=美国':option =>{
    //     var { rank_year, tag,university_country } = JSON.parse(option.body)
    //     console.log('mock')
    //     console.log(option)
    //     console.log('mock'+rank_year)
    //     console.log('mock'+tag)
    //     console.log('mock'+university_country)
    // }
}