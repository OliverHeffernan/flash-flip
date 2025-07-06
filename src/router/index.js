import { createRouter, createWebHashHistory } from 'vue-router';
import EditView from '../views/EditView.vue';
import LandingView from '../views/LandingView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import EmailConfirmView from '../views/EmailConfirmView.vue';
import LibraryView from '../views/LibraryView.vue';
import EmailConfirmation from '../views/EmailConfirmation.vue';

const routes = [
	{
		path: '/',
		name: 'Landing',
		component: LandingView,
	},
	{
		path: '/edit/:set_id',
		name: 'Edit',
		component: EditView,
		props: true,
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
	},
	{
		path: '/emailconf',
		name: 'Email Confirmation',
		component: EmailConfirmation,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
