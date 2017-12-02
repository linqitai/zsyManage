import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

const PageTransitionPC = (resolve) => {
  import('pages/PageTransitionPC').then((module) => {
    resolve(module)
  })
}
const Home = (resolve) => {
  import('pages/home/home').then((module) => {
    resolve(module)
  })
}
const PageTransition = (resolve) => {
  import('pages/PageTransition').then((module) => {
    resolve(module)
  })
}
const Test = (resolve) => {
  import('pages/test/test').then((module) => {
    resolve(module)
  })
}
const Get = (resolve) => {
  import('pages/test/get').then((module) => {
    resolve(module)
  })
}
const BarCode = (resolve) => {
  import('pages/test/barcode').then((module) => {
    resolve(module)
  })
}
const Chart = (resolve) => {
  import('pages/test/chart').then((module) => {
    resolve(module)
  })
}
const BigChart = (resolve) => {
  import('pages/test/bigChart').then((module) => {
    resolve(module)
  })
}
const Theme = (resolve) => {
  import('pages/test/theme').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      component: PageTransitionPC,
      children: [
        {
          path: '/',
          component: Home  
        }
      ]
    },
    {
      path: '/',
      component: PageTransition,
      children: [
        {
          path: '/test',
          component: Test
        },
        {
          path: '/get',
          component: Get
        },
        {
          path: '/barcode',
          component: BarCode
        },
        {
          path: '/chart',
          component: Chart
        },
        {
          path: '/bigChart',
          component: BigChart
        },
        {
          path: '/theme',
          component: Theme
        }
      ]
    }
    // {
    //   path: '/recommend',
    //   component: Recommend,
    //   children: [
    //     {
    //       path: ':id',
    //       component: Disc
    //     }
    //   ]
    // },
  ]
})
