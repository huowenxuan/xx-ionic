import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import {IM} from "../utils/IM";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  userId = ''
  constructor(
    public storage: Storage,
    public http: Http) {
  }

  public async login(userId) {
    this.userId = userId
    this.loginSuccess()
    return await this.storage.set("userId", userId)
  }

  /**
   * 从本地读取userId，只需要打开app后执行一次，将userId保存到变量中
   */
  public async storageGet(): Promise<string> {
    // 如果没有该字段，会返回null，不会报错
    this.userId = await this.storage.get("userId")
    if(this.userId) {
      this.loginSuccess()
    }
    return this.userId
  }

  public async logout() {
    this.userId = ''
    return await this.storage.remove("userId")
  }

  private loginSuccess() {
    IM.shareIM().login(this.userId)
  }

  private logoutSuccess() {

  }

}
