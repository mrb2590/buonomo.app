import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/es5/util/colors';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  theme: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    accent: '#81C784',
    error: '#F44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF9800'
  },
  customProperties: true,
  iconfont: 'fa'
});
