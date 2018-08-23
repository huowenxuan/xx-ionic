import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import * as moment from "moment";
import {UtilsProvider} from "./utils";
import axios from 'axios'
import queryString from "querystring";

export class Spend {
  user_id: string
  time: number
  type: string
  price: number
}

let host = 'http://localhost:7001/api'
// let host = 'http://www.huowenxuan.top/api'

@Injectable()
export class MoneyService {
  spendTypes = [
    {text: '居家', type: 'home', icon: 'home', description: '生活缴费，生活用品，家具，房租，维修'},
    // ice-cream pizza nutrition restaurant
    {text: '餐饮', type: 'food', icon: 'restaurant', description: '吃喝'},
    {text: '交通', type: 'traffic', icon: 'bus', description: '汽车，共享单车，公交，火车，飞机'},
    {text: '人情', type: 'social', icon: 'people', description: '朋友，亲戚，家人，反正就是送（赔）别人的'},
    {text: '外表', type: 'surface', icon: 'bowtie', description: '美容，美发，服饰'},
    {text: '学习', type: 'study', icon: 'book', description: '书籍，学习视频'},
    {text: '运动', type: 'sport', icon: 'basketball', description: '运动器材，健身房'},
    // film
    {text: '休闲', type: 'play', icon: 'game-controller-b', description: '电影，游戏，玩耍，旅行，门票，给自己买的玩具'},
    {text: '电子', type: 'electronic', icon: 'laptop', description: '话费，数码产品，手机电脑及配件'},
    {text: '医疗', type: 'medical', icon: 'medkit', description: '医疗'},
    {text: '办公', type: 'work', icon: 'attach', description: '工作'},
    {text: '宠物', type: 'pet', icon: 'paw', description: '宠物'},

    // 宠物
  ]

  constructor(public utils: UtilsProvider) {
  }

  async getMonthSpends(userId, time) {
    // let query = new AV.Query(Spend);
    // query.equalTo('userId', userId);
    // query.equalTo('time', time)
  }

  async createSpend(userId, price, time, type) {
    // let spend = new Spend()
    // spend.set('userId', userId)
    // spend.set('time', time)
    // spend.set('price', price)
    // spend.set('type', type)
  }

  async updateSpend(id, price, time, type) {
    // spend.set('time', time)
    // spend.set('price', price)
    // spend.set('type', type)
  }

  async deleteSpend(id) {
  }

  async getMonthAgoSpends(userId, num) {
    let monthAgo = moment().subtract(num, "months").toDate()
    monthAgo = this.utils.monthDateClear(monthAgo)
    // query.equalTo('userId', userId)
    // // 升序
    // query.addAscending('time')
    // query.greaterThanOrEqualTo('time', monthAgo)
  }
}
