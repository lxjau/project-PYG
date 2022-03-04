
export default [
    {
        path: '/center',
        name: 'center',
        component:()=>import('@/pages/Center'),
        meta: { show: true },
        children:[
            {
                path: 'myorder',
                name:'myorder',
                component:()=>import('@/pages/Center/MyOrder'),
            },
            {
                path: 'grouporder',
                name:'grouporder',
                component:()=>import('@/pages/Center/GroupOrder'),
            },
            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            },
        ]
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () =>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: ()=> import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuId',
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component:()=>import('@/pages/Home'),
        meta: { show: true }
    },

    {
        path: '/login',
        name: 'login',
        component:() =>import('@/pages/Login')
    },

    {
        path: '/register',
        component: ()=>import('@/pages/Register')
    },

    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
    },
    //重定向，开始就定到指定路由
    {
        path: '*',
        redirect: '/home'
    }
]