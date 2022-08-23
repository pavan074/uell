import {Injectable} from '@angular/core';
import * as _data from "../../assets/data.json";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    constructor() {} 

    getArea(data: any[]): any[]{
        var resp: any[] = [];
        [...new Set(data.map(item => item.qArea))].forEach(qArea => {
            resp.push({ 
              qArea: qArea,
              nQuestion: data.filter(x=> x.qArea == qArea).length,
              nReply: data.filter(x=> x.qArea == qArea && x.respText).length
          });              
        });
        return resp; 
    } 

    getCategoria(data: any[], qArea: string): any[]{
        var resp: any[] = [];
        [...new Set(data.filter(x=> x.qArea == qArea).map(item => item.categoria))].forEach(categoria => {
            resp.push({ 
              categoria: categoria,
              nQuestion: data.filter(x=> x.qArea == qArea && x.categoria == categoria).length,
              nReply: data.filter(x=> x.qArea == qArea && x.categoria == categoria && x.respText).length
          });              
        });
        return resp; 
    }
    
}








    /* getCurrenQuestion(data: any[], qArea: string, categoria: string, index: number): any[]{
        var dataList = data.filter(x=> x.qArea == qArea && x.categoria == categoria);
        return dataList[index]; 
    }

    getNextQuestion(data: any[], qArea: string, categoria: string, index: number): any{
        var dataList = data.filter(x=> x.qArea == qArea && x.categoria == categoria);        
        return dataList[index + 1]; 
    } */

    /* getNextQuestion(data: any[], qArea: string, categoria: string, index: number): any{
        var dataList = data.filter(x=> x.qArea == qArea && x.categoria == categoria);
        var newIndex = index + 1;
        if(dataList.length > 0 && newIndex <= dataList.length){
            return dataList[newIndex];
        }        
        return null; 
    } */

    /* getQuestion(data: any[], qArea: string, categoria: string, num: number): any[]{
        var res;
        if(num == null || num == -1){
            var dataList = data.filter(x=> x.qArea == qArea && x.categoria == categoria);
            if(dataList.length > 0){
                res = dataList[0];
            }
        }else{
            res = data.filter(x=> x.num == num)[0];
        }
        return res; 
    } */

    /* nextQuestion(data: any[], qArea: string, categoria: string, num: number): any{
        if(num == -1){
            num = data.filter(x=> x.qArea == qArea && x.categoria == categoria)[0].num;
        }
        console.log(num);
        var res = null;
        var finded = false;
        var exit = false;
        data.filter(x=> x.qArea == qArea && x.categoria == categoria).forEach(x => {
            if(exit == false){
                if(finded){
                    res = x;
                    exit = true;
                }
                if(x.num == num){
                    finded = true;
                }
            }
        });
        
        return res; 
    } */