import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoneyService} from "../../providers/money-service";
import {CalendarComponentOptions} from "ion2-calendar";
import {SpendEditPage} from "../spend-edit/spend-edit";
import * as echarts from 'echarts'
import {UserService} from "../../providers/user-service";
import {UtilsProvider} from "../../providers/utils";
import * as moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-tab-money',
  templateUrl: 'tab-money.html',
})
export class TabMoneyPage {
  lastYearChartData = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public userService: UserService,
    public moneyService: MoneyService) {
  }

  ionViewDidLoad() {
    this.moneyService.getMonthAgoSpends(this.userService.userId, 12)
      .then((spends)=>{
        let data = []
        spends.forEach((spend)=>{
          let {time, price, type, text} = spend.attributes
          let index = -1
          data.forEach((item, i)=>{
            if (this.utils.isSameDay(item.date, time)) {
              index = i
            }
          })

          if (index === -1) {
            data.push({date: time, price: parseFloat(price)})
          } else {
            data[index].price += parseFloat(price)
          }
        })
        this.lastYearChartData = data
        setTimeout(()=>this.updateCharts(), 300)
      })
  }

  ionViewDidEnter() {
    this.updateCharts()
  }

  updateCharts() {
    let data = this.lastYearChartData
    let total = 0
    data.forEach(item=>total+=item.price)

    let chart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: `过去${data.length}个月：￥${total}`
      },
      tooltip: {},
      legend: {
        data:['花费']
      },
      xAxis: {
        data: data.map(item=>{
          let m = moment(item.date)
          // return `${m.year()}/${m.month()+1}`
          return `${m.month()+1}月`
        })
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: data.map(item=>item.price.toFixed(2))
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option);
  }

  toEditSpend() {
    this.navCtrl.push(SpendEditPage)
  }
}
