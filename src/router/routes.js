import store from '../state/store';

const loadingView = require('../views/Loading').default;
const timeoutView = require('../views/Timeout').default;
const notFoundView = require('../views/404').default;

export default [
  {
    path: '/',
    name: 'home',
    component: () => lazyLoadView(import(/* webpackChunkName: "home" */ '../views/Home')),
    meta: {
      displayName: 'Buonomo'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => lazyLoadView(import(/* webpackChunkName: "dashboard" */ '../views/Dashboard')),
    meta: {
      displayName: 'Dashboard'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import(/* webpackChunkName: "profile" */ '../views/Profile')),
    meta: {
      displayName: 'Profile',
      authRequired: true
    }
  },
  {
    path: '/drive',
    name: 'drive',
    component: () => lazyLoadView(import(/* webpackChunkName: "drive" */ '../views/Drive')),
    meta: {
      displayName: 'Drive',
      authRequired: true
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => lazyLoadView(import(/* webpackChunkName: "chat" */ '../views/Chat')),
    meta: {
      displayName: 'Chat',
      authRequired: true
    }
  },
  {
    path: '/games',
    name: 'game',
    component: () => lazyLoadView(import(/* webpackChunkName: "games" */ '../views/Games')),
    meta: {
      displayName: 'Games'
    }
  },
  {
    path: '/surveillance',
    name: 'surveillance',
    component: () => lazyLoadView(import(
      /* webpackChunkName: "surveillance" */ '../views/Surveillance'
    )),
    meta: {
      displayName: 'Surveillance',
      authRequired: true
    }
  },
  {
    path: '/preferences',
    name: 'preferences',
    component: () => lazyLoadView(import(
      /* webpackChunkName: "preferences" */ '../views/Preferences'
    )),
    meta: {
      displayName: 'Preferences'
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => lazyLoadView(import(/* webpackChunkName: "auth" */ '../views/SignIn')),
    meta: {
      displayName: 'Sign In'
    },
    beforeEnter (routeTo, routeFrom, next) {
      // If the user is already logged in redirect to the profile page instead
      // otherwise continue to sign in page
      if (store.getters['auth/signedIn']) {
        next({ name: 'dashboard' });
      } else {
        next();
      }
    }
  },
  {
    path: '/signout',
    name: 'signout',
    meta: {
      authRequired: true
    },
    beforeEnter (routeTo, routeFrom, next) {
      const authRequiredOnPreviousRoute = routeFrom.matched.some(route => route.meta.authRequired);

      store.dispatch('auth/signOut');

      // Navigate back to previous page, or home as a fallback
      next(authRequiredOnPreviousRoute ? { name: 'signin' } : { ...routeFrom });
    }
  },
  {
    path: '/404',
    name: '404',
    component: notFoundView,
    meta: {
      displayName: '404'
    },
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true
  },
  // Redirect any unmatched routes to the 404 page
  {
    path: '*',
    redirect: '404'
  }
];

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: loadingView,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: timeoutView,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 200,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 100000
  });

  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
}
