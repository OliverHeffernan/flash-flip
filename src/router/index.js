import { createRouter, createWebHistory } from 'vue-router';
import EditView from '../views/EditView.vue';
import LandingView from '../views/LandingView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import EmailConfirmView from '../views/EmailConfirmView.vue';
import LibraryView from '../views/LibraryView.vue';

const routes = [
	{
		path: '/',
		name: 'Landing',
		component: LandingView,
	},
	{
		path: '/edit',
		name: 'Edit',
		component: EditView,
	},
	{
		path: '/signup',
		name: 'Sign Up',
		component: SignUpView,
	},
	{
		path: '/signin',
		name: 'Sign In',
		component: SignInView,
	},
	{
		path: '/emailconfirmed',
		name: 'Email Confirmed',
		component: EmailConfirmView,
	},
	{
		path: '/library',
		name: 'Library',
		component: LibraryView
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
