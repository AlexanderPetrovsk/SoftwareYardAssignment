import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import colors from 'vuetify/util/colors';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      dark: {
        colors: {
          primary: colors.blue.darken3,
        },
      },
    },
    defaultTheme: 'dark',
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);

app.mount('#app');
