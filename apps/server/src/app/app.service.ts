/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { getCollectionData } from '@nx-template/firebase'
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  getUsers(): Promise<any> {
    console.log('getUsers')
    return getCollectionData({
      collection: 'users'
    })
  }
}
