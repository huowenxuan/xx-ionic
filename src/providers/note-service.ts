import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import axios from 'axios'
import queryString from 'querystring'

export class Note {
  id: string
  userId: string
  start?: number // 开始时间，非必须
  end: number  // 日程结束时间
  text: string
}

// let host = 'http://localhost:7001/api'
let host = 'https://www.huowenxuan.top/api'

@Injectable()
export class NoteService {
  constructor() {
  }

  async createNote(user_id: string, start: number, end: number, text: string) {
    let url = host + '/note'
    let body = {
      user_id, start,
      end, text
    }
    let response: any = await axios.post(url, body)
    return response.data.data
  }

  async updateNote(id, text, start, end) {
    let url = host + '/note/' + id
    let body = {start, end, text}
    let response: any = await axios.put(url, body)
    return response.data.data
  }

  async getNotes(user_id, offset = 0, limit = 10) {
    let url = host + '/note?'
    url += queryString.stringify({user_id, offset, limit})
    let response: any = await axios.get(url)
    return response.data.data
  }

  async deleteNote(id) {
    let url = host + '/note/' + id
    let response: any = await axios.delete(url)
    return response.data.data
  }

  async searchNote(text, userId, offset = 0, limit = 10) {
    let url = host + '/note/search/' + encodeURI(text) + '?'
    url += queryString.stringify({user_id: userId, offset, limit})
    let response: any = await axios.get(url)
    return response.data.data
  }

  /**
   * 获取某一日期范围内的note
   */
  async getNotesRange(userId, from: Date, to: Date) {
    // 从第一天第0秒，到最后一天的最后一秒
    if (from) {
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0)
    }

    to.setHours(23);
    to.setMinutes(59);
    to.setSeconds(59)

    let url = host + '/note/range?'
    url += queryString.stringify({
      user_id: userId,
      from: from ? from.getTime(): null,
      to: to.getTime()
    })
    let response: any = await axios.get(url)
    return response.data.data
  }
}
