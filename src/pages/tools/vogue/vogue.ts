import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ControllersService} from "../../../providers/controllers-service";
import {PhotoLibrary} from '@ionic-native/photo-library';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {UtilsProvider} from "../../../providers/utils";
import axios from 'axios'

@IonicPage()
@Component({
  selector: 'page-vogue',
  templateUrl: 'vogue.html',
})
export class VoguePage {
  title
  imgs

  startShow = true // 开始任务后就不显示开始按钮了
  downloadShow = false // 显示下载和Safari打开

  queryTimer

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ctrls: ControllersService,
    public alertCtrl: AlertController,
    public iab: InAppBrowser,
    private photoLibrary: PhotoLibrary,
    public utils: UtilsProvider,
  ) {
  }

  ionViewDidLoad() {
    this.query(true)
  }

  ionViewWillLeave() {
    clearInterval(this.queryTimer)
  }

  start() {
    let loading = this.ctrls.loading()
    loading.present()
    axios.get('http://huowenxuan.leanapp.cn/api/vogue/start').then((response: any) => {
      response = response.data
      loading.dismiss()
      console.log(response)
      if (!response.success) {
        this.ctrls.toast('出错了').present()
        return
      }
      this.ctrls.toast('任务开始，自动查询中...').present()

      const {category, title} = response.data
      this.title = `${title} ${category}`
      this.startShow = false

      clearInterval(this.queryTimer)
      this.queryTimer = setInterval(() => {
        this.query(false)
      }, 5000)
    })
      .catch((e) => {
        // Network Error
        loading.dismiss()
        this.ctrls.toast(e.message, 'bottom', 20000).present()
        console.log(e)
      })
  }

  query(isLoading) {
    let loading = this.ctrls.loading()
    isLoading && loading.present()
    axios.get('http://huowenxuan.leanapp.cn/api/vogue/query').then((response: any) => {
      response = response.data
      loading.dismiss()
      try {
        const {data} = response
        this.imgs = data
        this.ctrls.toast(`今天保存了${data.length}张图片`).present()
        if (data.length >= 9) {
          clearInterval(this.queryTimer)
          this.downloadShow = true
        }
      } catch (e) {
        this.ctrls.toast('出错了').present()
      }
    })
      .catch((e) => {
        // Network Error
        loading.dismiss()
        this.ctrls.toast(e.message, 'bottom', 20000).present()
        console.log(e)
      })
  }

  copy() {
    this.utils.copy(this.title)
    this.ctrls.toast('复制成功').present()
  }

  save() {
    this.photoLibrary.requestAuthorization().then(async () => {
      let index = 0
      let imgSet = new Set()
      for (let img of this.imgs) {
        if (index >= 9) {
          break
        }
        let url = img.url
        if (!imgSet.has(url)) {
          imgSet.add(url)
          await this.photoLibrary.saveImage(img.url, 'SHOW')
          index++
        }
      }
      this.ctrls.toast('保存完成').present()
    })
      .catch(err => console.log('permissions weren\'t granted'));
  }

  openSafari() {
    let url = 'https://huowenxuan.leanapp.cn/api/vogue/today_page'
    this.iab.create(url)
    this.utils.copy(url)
    // WKWebView无法打开Safari
    this.ctrls.toast('保存到剪贴板，打开Safari暂时无效').present()
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: '确定删除全部图片？',
      message: '',
      mode: 'md',
      buttons: [
        {text: '取消', role: 'cancel'},
        {
          text: '删除', handler: () => {
            let loading = this.ctrls.loading()
            loading.present()
            axios.get('http://huowenxuan.leanapp.cn/api/vogue/delete').then((response: any) => {
              let data = response.data
              loading.dismiss()
              this.ctrls.toast(`删除${data.success ? '成功' : '失败'}`).present()
            })
              .catch((e) => {
                // Network Error
                loading.dismiss()
                this.ctrls.toast(e.message, 'bottom', 20000).present()
                console.log(e)
              })
          }
        }
      ]
    });
    alert.present();
  }
}
