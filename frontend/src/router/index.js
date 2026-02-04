import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ApiDocs from '../views/ApiDocs.vue'
import Dashboard from '../views/Dashboard.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import Disclaimer from '../views/Disclaimer.vue'
import CookiePolicy from '../views/CookiePolicy.vue'
import DMCA from '../views/DMCA.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api-docs',
    name: 'ApiDocs',
    component: ApiDocs
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: Disclaimer
  },
  {
    path: '/cookie-policy',
    name: 'CookiePolicy',
    component: CookiePolicy
  },
  {
    path: '/dmca',
    name: 'DMCA',
    component: DMCA
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
