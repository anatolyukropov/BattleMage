import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import(/* webpackChunkName: "Register" */ './views/Register.vue'),
            meta: {
                requiresGuest: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "Login" */ './views/Login.vue'),
            meta: {
                requiresGuest: true,
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import(/* webpackChunkName: "Profile" */ './views/Profile.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        // }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next('/login');
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        console.log('wtf', store)
        if (store.getters.isLoggedIn) {
            next('/home');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
