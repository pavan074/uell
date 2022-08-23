/* import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as _data from "../../assets/data.json";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    
    constructor(private storage: Storage) {        
        //this.storage.clear();
    } 

    async setInitData(): Promise<any>{
        console.log("his.storage.remove('data')");
        await this.storage.remove('data');
        return await this.storage.set('data', (_data as any).default);
    };

    async setData(data: any[]): Promise<any>{
        return await this.storage.set('data', data);
    };

    async getData(): Promise<any>{
        return this.storage.get('data');
    };

    async create(){
        await this.storage.create();
    };

    async set(key: string, value: any): Promise<any> {
        return this.storage.set(key, value);
    }

    async get(key: string): Promise<any> {
        return await this.storage.get(key);
    }
    async remove(key: string): Promise<any> {
        return this.storage.remove(key);
    }
    
} */