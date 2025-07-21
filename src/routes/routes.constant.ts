export const ROUTES = {
  // Dashboard routes
  DASHBOARD: "/",
  BRAND: "/brand",
  BRAND_LIST: "/brands",
  BRAND_CREATE: "/brand/create",
  BRAND_EDIT: "/brand/edit",
  ANALYTICS: "/analytics",
  ANALYTIC: "/analytic",
  PLATFORM: "/platform",
  INGREDIENT: "/ingredient",
  CHAT: "/chat",
  RELATIONSHIP_PREVIEW: "/relationship",

  get PLATFORM_ANALYTIC() {
    return `${this.ANALYTIC}${this.PLATFORM}`;
  },
  get BRAND_ANALYTIC() {
    return `${this.ANALYTIC}${this.BRAND}`;
  },
  get INGREDIENT_ANALYTIC() {
    return `${this.ANALYTIC}${this.INGREDIENT}`;
  },
  MARKET_RESEARCH: "/market-research",
  MARKET_RESEARCH_CREATE: "/market-research/add",
  MARKET_RESEARCH_EDIT: "/market-research/edit",

  // Auth routes
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",

  // DUMMY
  D_CHARTS: "/dummy/charts",
  D_TABLE: "/dummy/tables",
};
