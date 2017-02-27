/**
 * Created by CAOYI on 2017/2/21.
 */
"use strict";
const home    = "",
      apiHome = "/api",
      api     = {
          user     : {
              login     : apiHome + '/user/login'
              , register: apiHome + '/user/register'
          }
          , article: {
              create: apiHome + '/article/create'
          }
      };
define(function () {

    return {
        home   : home,
        apiHome: apiHome,
        api    : api
    }
});