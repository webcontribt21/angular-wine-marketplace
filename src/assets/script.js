import {
  environment
} from "../environments/environment";

export function googleAnalyticsHeadScripts() {
  const head = document.getElementsByTagName('head')[0];

  const googleAnalyticsFirstScript = document.createElement('script');
  googleAnalyticsFirstScript.async = true;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.googleAnalyticsKey;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = '    window.dataLayer = window.dataLayer || [];\n' +
    '    function gtag(){dataLayer.push(arguments);}\n' +
    '    gtag(\'js\', new Date());\n' +
    '\n' +
    '    gtag(\'config\', \'' + environment.googleAnalyticsKey + '\');';

  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  head.insertBefore(googleAnalyticsFirstScript, head.firstChild);
}

export function googleAnalytics(url) {
  if (typeof gtag !== 'undefined') {
    gtag('config', environment.googleAnalyticsKey, {
      'page_path': url
    });
  }
}

export function googleAdwordsHeadScripts() {
  const head = document.getElementsByTagName('head')[0];

  const googleAnalyticsFirstScript = document.createElement('script');
  googleAnalyticsFirstScript.async = true;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.googleAdwordsKey;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = '    window.dataLayer = window.dataLayer || [];\n' +
    '    function gtag(){dataLayer.push(arguments);}\n' +
    '    gtag(\'js\', new Date());\n' +
    '\n' +
    '    gtag(\'config\', \'' + environment.googleAdwordsKey + '\');';

  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  head.insertBefore(googleAnalyticsFirstScript, head.firstChild);
}

export function googleAdwords(type, data) {
  if (typeof gtag !== 'undefined') {
    gtag('event', type, data);
  }
}

export function facebookSDKScripts() {

  // const head = document.getElementsByTagName('head')[0];

  const facebookSDKcript = document.createElement('script');
  facebookSDKcript.innerHTML = '    window.fbAsyncInit = function () {\n' +
    '    FB.init({\n' +
    '     appId: \'' + environment.facebookAppId + '\',\n' +
    '     cookie: true,\n' +
    '     xfbml: true,\n' +
    '     version: \'v4.0\'\n' +
    '    });\n' +
    '    FB.AppEvents.logPageView();\n' +
    '   };\n' +
    '   (function (d, s, id) {\n' +
    '    var js, fjs = d.getElementsByTagName(s)[0];\n' +
    '    if (d.getElementById(id)) {\n' +
    '     return;\n' +
    '    }\n' +
    '    js = d.createElement(s);\n' +
    '    js.id = id;\n' +
    '    js.src = "https://connect.facebook.net/en_US/sdk.js";\n' +
    '    fjs.parentNode.insertBefore(js, fjs);\n' +
    '    }(document, \'script\', \'facebook-jssdk\'));';

  // head.insertBefore(facebookSDKcript, head.firstChild);
  document.body.appendChild(facebookSDKcript);

}
