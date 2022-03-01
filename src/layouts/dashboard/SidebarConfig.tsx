// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components

import { Icon } from "@iconify/react";
import SvgIconStyle from "../../components/SvgIconStyle";

const iconify: string = `iconify`;

const svg: string = `svg`;

const getIcon = (name: string, type?: string, isNavHeader?: boolean) => {
  let props = !isNavHeader ? { width: `100%`, height: `100%` } : {};
  return type === iconify ? (
    <Icon icon={name} {...props} />
  ) : (
    <SvgIconStyle
      src={`/static/icons/navbar/${name}.svg`}
      sx={{ width: "100%", height: "100%" }}
    />
  );
};

const ICONS = {
  general: getIcon(`ic_dashboard`, svg, true),
  systemAdmin: getIcon(`ic:sharp-manage-accounts`, iconify),
  resourceManagement: getIcon(`ic_resource_management`, svg),
  gridEnergy: getIcon(`ic_grid_energy`, svg, true),
  siteEnergy: getIcon(`ic_site_energy`, svg, false),
  energyTrading: getIcon(`ic_energy_trading`, svg),
  user: getIcon("heroicons-solid:users", iconify),
  owner: getIcon("clarity:administrator-solid", iconify),
  home: getIcon("fa-solid:home", iconify),
  gridEnergySetup: getIcon(`ic_energy_setup`),
  gridEnergyReport: getIcon(`ic_energy_report`),
  siteCapacityManagement: getIcon(`ic_capacity_management`),
  siteRenewableIntegration: getIcon(`ic_renewable_energy`),
  siteReport: getIcon(`ic_site_report`),
  energyTrend: getIcon(`ic_energy_trend`),
  energyPorfolio: getIcon(`ic_energy_portfolio`),
  company: getIcon("ic:twotone-business", iconify),
  boost: getIcon(`ic:round-ev-station`, iconify),
  gridEnergyProgram: getIcon(`fluent:table-lightning-20-filled`, iconify),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    icon: ICONS.general,
    items: [
      {
        title: "home",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.home,
      },
    ],
  },

  // SYSTEM ADMINISTRATION
  // ----------------------------------------------------------------------
  {
    subheader: "system administration",
    icon: ICONS.systemAdmin,
    items: [
      {
        title: "users",
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user,
      },
      {
        title: "owners",
        path: PATH_DASHBOARD.user.owners,
        icon: ICONS.owner,
      },
      {
        title: "partners",
        path: PATH_DASHBOARD.company.list,
        icon: ICONS.company,
      },
    ],
  },

  // RESOURCE MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "resource management",
    icon: ICONS.resourceManagement,
    items: [
      {
        title: "boost devices",
        path: PATH_DASHBOARD.boost.list,
        icon: ICONS.boost,
      },
    ],
  },
  // Grid Energy
  // ----------------------------------------------------------------------
  {
    subheader: "grid energy",
    icon: ICONS.gridEnergy,
    items: [
      {
        title: "program management",
        path: PATH_DASHBOARD.grid.program,
        icon: ICONS.gridEnergyProgram,
      },
      {
        title: "configuration",
        path: PATH_DASHBOARD.grid.configure,
        icon: ICONS.gridEnergySetup,
      },
      {
        title: "reports",
        path: PATH_DASHBOARD.grid.report,
        icon: ICONS.gridEnergyReport,
      },
    ],
  },
  // Site Energy
  // ----------------------------------------------------------------------
  {
    subheader: "site energy",
    icon: ICONS.siteEnergy,
    items: [
      {
        title: "capacity management",
        path: PATH_DASHBOARD.site.capacity,
        icon: ICONS.siteCapacityManagement,
      },
      {
        title: "renewable integration",
        path: PATH_DASHBOARD.site.renewable,
        icon: ICONS.siteRenewableIntegration,
      },
      {
        title: "reports",
        path: PATH_DASHBOARD.site.report,
        icon: ICONS.siteReport,
      },
    ],
  },
  // Site Energy
  // ----------------------------------------------------------------------
  {
    subheader: "Energy Trading",
    icon: ICONS.energyTrading,
    items: [
      {
        title: "forecast",
        path: PATH_DASHBOARD.energy.forecast,
        icon: ICONS.energyTrend,
      },
      {
        title: "portfolio",
        path: PATH_DASHBOARD.energy.portfolio,
        icon: ICONS.energyPorfolio,
      },
    ],
  },
];

export default sidebarConfig;
