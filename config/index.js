export const typingTimeout = 200 // After this delay the search api will be fired
export const loadingTimeout = 500 // Loading indicator will be shown after this delay // used at Loading.vue of admin

export const { HTTP_ENDPOINT = 'https://api.mcqworld.in' } = process.env
export const { WS_ENDPOINT = 'wss://api.mcqworld.in' } = process.env

export const { GOOGLE_ANALYTICS_ID = 'UA-49421899-13' } = process.env

export const { STRIPE_PUBLISHABLE_KEY = 'pk_test_96u8xKulOOGOLoyc2Jt167fH00DENCsyyF' } = process.env

export const { ONESIGNAL_APP_ID = '' } = process.env

export const { GOOGLE_MAPS_API_KEY = '' } = process.env

export const { WEBSITE_NAME = 'LrNr' } = process.env

export const HEAD = {
  titleTemplate: `%s - ${WEBSITE_NAME}`,
  htmlAttrs: { lang: 'en' },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
    { 'http-equiv': 'Accept-CH', content: 'DPR, Viewport-Width, Width' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Nunito&display=swap',
    },
  ],
}
