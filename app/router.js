import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import CharacterCustomization from  './components/Character.vue';
import Game from './components/Game.vue';
import Lose from './components/Lose.vue';
import Win from './components/Win.vue';
import Intro from './components/Intro.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/character-customization',
      name: 'character customization',
      component: CharacterCustomization,
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
    },
    {
      path: '/game/:id',
      name: 'game',
      component: Game,
    },
    {
      path: '/win',
      name: 'win',
      component: Win,
    },
    {
      path: '/lose/:id',
      name: 'lose',
      component: Lose,
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
