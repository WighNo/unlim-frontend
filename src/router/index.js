import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [{ 
        path: '/:pathMatch(.*)*', 
        name: 'not-found',
        component: () => import("@/views/NotFound.vue")
     },
     { 
        path: '/', 
        name: 'about-me',
        component: () => import("@/views/AboutMe.vue")
     },
     { 
        path: '/task', 
        name: 'task',
        component: () => import("@/views/TaskPage.vue")
     },
    ],
  });