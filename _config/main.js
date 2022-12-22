export default {
  moduleName: 'flight',
  //Entities
  entityNames: {
    aircraftType: 'aircraftType',
    airline: 'airline',
    flightSchedule: 'flightSchedule',
    flightScheduleLeg: 'flightScheduleLeg',
    airlport: 'airlport',
    flight: 'flights'
  },
  quickCards: [
    {
      active: true,
      //permission: 'profile.user.manage',
      component: () => import('../_components/quick-cards/lineChart.vue')
    },
    {
      active: true,
      //permission: 'profile.user.manage',
      component: () => import('../_components/quick-cards/bar.vue')
    },
    {
      active: true,
      //permission: 'profile.user.manage',
      component: () => import('../_components/quick-cards/percentage.vue')
    },
  ]
}
