import '@/styles/global.scss';

import { createApp } from 'vue';
import App from './App.vue';

import InlineSvg from 'vue-inline-svg';

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseContainer from '@/components/UI/BaseContainer.vue';

const app = createApp(App);
app.component('inline-svg', InlineSvg);
app.component('base-button', BaseButton);
app.component('base-input', BaseInput);
app.component('base-container', BaseContainer);

app.mount('#app');
