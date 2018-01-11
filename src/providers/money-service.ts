import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import * as AV from 'leancloud-storage'
import {LCStorageProvider} from "./lc-storage";

export class Spend extends AV.Object {
  userId: string
  time: Date
  type: string
  price: string
}

@Injectable()
export class MoneyService {
  spendTypes = [
    {text: '居家', type: 'home', icon: 'home', description: '生活缴费，家具，房租，生活用品'},
    // ice-cream pizza nutrition restaurant
    {text: '餐饮', type: 'food', icon: 'restaurant', description: '吃喝'},
    {text: '交通', type: 'traffic', icon: 'bus', description: '共享单车，公交，火车，飞机'},
    {text: '人情', type: 'social', icon: 'people', description: '朋友，亲戚，家人，反正就是送（赔）别人的'},
    {text: '服饰', type: 'clothes', icon: 'bowtie', description: '衣服鞋子'},
    {text: '学习', type: 'study', icon: 'book', description: '书籍，学习视频'},
    {text: '运动', type: 'sport', icon: 'basketball', description: '运动器材，健身房'},
    // film
    {text: '娱乐', type: 'play', icon: 'game-controller-b', description: '电影，游戏，玩耍，给自己买的玩具'},
    {text: '电子', type: 'electronic', icon: 'laptop', description: '话费，数码产品，手机电脑及配件'},
  ]

  constructor(public lcStorage: LCStorageProvider) {
    lcStorage.registerObject(Spend)
  }

  getMonthSpend(userId, time): Promise<Array<any>> {
    let query = new AV.Query(Spend);
    query.equalTo('userId', userId);
    query.equalTo('time', time)

    return new Promise((resolve, reject) => {
      query.find().then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  createSpend(userId, price, time, type) {
    let spend = new Spend()
    spend.set('userId', userId)
    spend.set('time', time)
    spend.set('price', price)
    spend.set('type', type)
    return new Promise((resolve, reject) => {
      spend.save().then(
        (res) => resolve(res),
        (error) => reject(error))
    })
  }

  updateSpend(id, price, time, type) {
    let spend = AV.Object.createWithoutData('Spend', id)
    spend.set('time', time)
    spend.set('price', price)
    spend.set('type', type)
    return new Promise((resolve, reject) => {
      spend.save().then(
        (res) => resolve(res),
        (error) => reject(error))
    })
  }

  deleteSpend(id) {
    let spend = AV.Object.createWithoutData('Spend', id);
    return new Promise((resolve, reject) => {
      spend.destroy().then(
        (res) => resolve(),
        (error) => reject(error))
    })
  }
}
