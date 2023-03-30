/**
 * Use dark theme for the web UI
 */
const darkTheme = true;

(function () {
    var themeCss = document.createElement('link');
    themeCss.rel = 'stylesheet';
    themeCss.type = 'text/css';
    themeCss.href = '/static/css/' + (darkTheme ? 'theme-dark-colors.css' : 'theme-light-colors.css');
    document.getElementsByTagName('head')[0].appendChild(themeCss);
})();
