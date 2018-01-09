import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import * as AV from 'leancloud-storage'
import {LCStorageProvider} from "./lc-storage";

export class SpendType extends AV.Object {
  text: string
  type: string
}

export class Spend extends AV.Object {
  userId: string
  time: Date
  typeId: SpendType
  price: number
}

let AllTypes = [
  {text: '居家', type: 'home'},
  {text: '餐饮', type: 'food'},
  {text: '交通', type: 'traffic'},
  {text: '话费', type: 'phone'},
  {text: '社交', type: 'social'},
  {text: '家人', type: 'family'},
  {text: '衣物', type: 'clothes'}
]

@Injectable()
export class MoneyService {
  constructor(public lcStorage: LCStorageProvider) {
    lcStorage.registerObject(SpendType)
    lcStorage.registerObject(Spend)

    this.autoAddTypes()
  }

  async autoAddTypes() {
    let types = await this.getAllSpendTypes()
    AllTypes.forEach((item)=>{
      if (!types.some(({attributes: attr})=>attr.text === item.text)) {
        this.createSpendType(item.text, item.type)
      }
    })
  }

  createSpendType(text: string, type: string) {
    let spendType = new SpendType();
    spendType.set('text', text)
    spendType.set('type', type)
    return new Promise((resolve, reject) => {
      spendType.save().then(
        (res) => resolve(res.id),
        (error) => reject(error))
    })
  }

  getAllSpendTypes(): Promise<any> {
    let query = new AV.Query(SpendType);
    return new Promise((resolve, reject) => {
      query.find().then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  createSpend(userId, price, time, typeId) {
    let spend = new Spend()
    spend.set('userId', userId)
    spend.set('time', time)
    spend.set('price', price)
    spend.set('typeId', typeId)
    return new Promise((resolve, reject) => {
      spend.save().then(
        (res) => resolve(res.id),
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
