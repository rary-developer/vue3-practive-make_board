import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router'; //router - index.js에서 설정
import objPlugins from './plugins/obj';
import person from './plugins/person';
import globalDirectives from './plugins/global-directives';
import dayjs from './plugins/dayjs';
import { createPinia } from 'pinia';
//import focus from '@/directives/focus';
//import globalComponents from './plugins/global-components';

const app = createApp(App);
//app.use(globalComponents);
app.use(objPlugins, { name: '김태희' });
app.use(person, { name: '홍길동' });
app.use(router);
app.use(globalDirectives);
app.use(dayjs);
app.use(createPinia());
//app.directive('focus', focus);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

// console.log('MODE:', import.meta.env.MODE);
// console.log('BASE_URL:', import.meta.env.BASE_URL);
// console.log('PROD:', import.meta.env.PROD);
// console.log('DEV:', import.meta.env.DEV);
// console.log('VITE_APP_API_URL:', import.meta.env.VITE_APP_API_URL);
