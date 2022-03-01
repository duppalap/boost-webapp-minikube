// ----------------------------------------------------------------------

export function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const ROOTS_DASHBOARD = "/";
export const ROOTS_AUTH = "/auth";
export const ROOT_USER = "/customer";
export const ROOT_COMPANY = "/company";
export const ROOT_BOOST = "/boost";
export const ROOT_BOOST_GROUP = "/bg";
export const ROOT_GRID = "/grid";
export const ROOT_SITE = "/site";
export const ROOT_ENERGY_TREND = "/energy/trend";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  register: path(ROOTS_AUTH, "/register"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  verify: path(ROOTS_AUTH, "/verify"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, "/mail"),
    all: path(ROOTS_DASHBOARD, "/mail/all"),
  },
  user: {
    root: path(ROOTS_DASHBOARD, ROOT_USER),
    list: path(ROOT_USER, `/user/list`),
    owners: path(ROOT_USER, `/owner/list`),
    newUser: path(ROOT_USER, `/user/new`),
    editUser: path(ROOT_USER, `/user/edit`),
    newOwner: path(ROOT_USER, `/owner/new`),
    editOwner: path(ROOT_USER, `/owner/edit`),
    boostGroups: path(ROOT_USER, `/owner/bg/list`),
    account: path(ROOT_USER, `/account`),
  },
  company: {
    root: path(ROOTS_DASHBOARD, ROOT_COMPANY),
    list: path(ROOT_COMPANY, `/list`),
  },
  boost: {
    root: path(ROOTS_DASHBOARD, ROOT_BOOST),
    list: path(ROOT_BOOST, `/list`),
    add: path(ROOT_BOOST, `/add`),
    edit: path(ROOT_BOOST, `/edit`),
  },
  boostGroup: {
    root: path(ROOTS_DASHBOARD, ROOT_BOOST_GROUP),
    list: path(ROOT_BOOST_GROUP, `/list`),
    edit: path(ROOT_BOOST_GROUP, `/edit`),
    add: path(ROOT_BOOST_GROUP, `/add`),
    configure: path(ROOT_BOOST_GROUP, `/configure`),
    report: path(ROOT_BOOST_GROUP, "/report"),
  },
  grid: {
    root: path(ROOTS_DASHBOARD, ROOT_GRID),
    program: path(ROOT_GRID, `/program`),
    configure: path(ROOT_GRID, `/configure`),
    report: path(ROOT_GRID, `/reports`),
  },
  site: {
    root: path(ROOTS_DASHBOARD, ROOT_SITE),
    capacity: path(ROOT_SITE, `/capacity`),
    renewable: path(ROOT_SITE, `/renewable/integration`),
    report: path(ROOT_SITE, `/reports`),
  },
  energy: {
    root: path(ROOTS_DASHBOARD, ROOT_ENERGY_TREND),
    forecast: path(ROOT_ENERGY_TREND, `/forecast`),
    portfolio: path(ROOT_ENERGY_TREND, `/portfolio`),
  },
};

export const PATH_DOCS =
  "https://freewiretech.atlassian.net/wiki/spaces/SWDEV/pages/437583874/AMP+For+Boost+User+Guide";
