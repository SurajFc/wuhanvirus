import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Details from "@/components/Details.vue";
import Country from "@/components/Country.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/country",
    name: "country",
    component: Country,
  }, {
    path: "/country/:country",
    name: "Details",
    component: Details,
    props: true
  },
  {
    path: "/news",
    name: "News",
    component: () =>
      import("@/components/News.vue")
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    component: () => import("@/views/Symptoms.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
