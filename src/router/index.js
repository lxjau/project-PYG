import Vue from "vue";
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)



// 把VueRouter原型对象的push|replace方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    routes,
    // 始终滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        // 登录
        if (to.path == '/login') {
            next('/')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('Logout')
                }
            }

        }
    } else {
        // 未登录
        let toPath =to.path
        if(toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 || toPath.indexOf('/trade')!=-1){
            console.log(111);
            next('/login')
        }else{
         next()
        }
        
    }
})

export default router