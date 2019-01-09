import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import store from '../state/store';
import routes from './routes';

Vue.use(VueRouter);

Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'metaInfo'
});

const router = new VueRouter({
  routes,
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  store.dispatch('auth/validateToken').then(validUser => {
    // Then continue if the token still represents a valid user,
    // otherwise redirect to signin.
    if (authRequired && !validUser) {
      next({ name: 'signin', query: { redirectFrom: routeTo.fullPath } });
    } else {
      next();
    }
  });
});

router.beforeResolve((routeTo, routeFrom, next) => {
  next();
});

router.afterEach((routeTo, routeFrom) => {
  //
});

export default router;
