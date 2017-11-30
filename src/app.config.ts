export const LCAppId = 'qSOnDMNzKdGGSipnT7OxO7Cb-gzGzoHsz'
export const LCAppKey = 'WakeTHDyS6A3QjCfGtQGor0g'
export const LCMasterKey = 'n4LgUleKqdD8RVrBl7dBsDvE'

export default class AppConfig {
  //测试环境URL
  public static getDebugUrl() {
    return "http://localhost:8080";
  }
  //生产环境URL
  public static getProdUrl() {
    return "http://service:8080";
  }
  //获取设备高度
  public static getWindowHeight() {
    return window.screen.height;
  }
  //获取设备宽度
  public static getWindowWidth() {
    return window.screen.width;
  }
}
