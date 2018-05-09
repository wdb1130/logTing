import { Injectable } from '@angular/core';
import { Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpService } from "./HttpService";
import { APP_SERVE_URL } from './Constants';

@Injectable()
export class PlantService {
  constructor(public httpService: HttpService){
  }
  //登陆,查询用户信息
  loginUser(val){
    return this.httpService.post(APP_SERVE_URL + 'userLogin.php',val).map((res: Response) => res.json());
  }

  //合同列表查询
  agreement(val){
    return this.httpService.post(APP_SERVE_URL + 'agreement.php',val).map((res: Response) => res.json());
  }

  //合同信息查询
  agreement_detail(val){
    return this.httpService.post(APP_SERVE_URL + 'agreementDetail.php',val).map((res: Response) => res.json());
  }

  //用户列表查询
  userList(val){
    return this.httpService.post(APP_SERVE_URL + 'userList.php',val).map((res: Response) => res.json());
  }

  //新增日志接口
  newLog(val){
    return this.httpService.post(APP_SERVE_URL + 'newLog.php',val).map((res: Response) => res.json());
  }
  //project detail
  projectInfo(val){
    return this.httpService.post(APP_SERVE_URL + 'projectInfo.php',val).map((res: Response) => res.json());
  }
  //myLog
  myLog(val){
    return this.httpService.post(APP_SERVE_URL + 'myLog.php',val).map((res: Response) => res.json());
  }
  //delete log
  delLog(val){
    return this.httpService.post(APP_SERVE_URL + 'delLog.php',val).map((res: Response) => res.json());
  }
  //receiveLog
  receiveLog(val){
    return this.httpService.post(APP_SERVE_URL + 'receiveLog.php',val).map((res: Response) => res.json());
  }
  //log detail 
  logDetail(val){
    return this.httpService.post(APP_SERVE_URL + 'logDetail.php',val).map((res: Response) => res.json());
  }
  //阅读的人
  logReadPerson(val){
    return this.httpService.post(APP_SERVE_URL + 'logReadPerson.php',val).map((res: Response) => res.json());
  }

  //本用户是否阅读
  readLog(val){
    return this.httpService.post(APP_SERVE_URL + 'readLog.php',val).map((res: Response) => res.json());
  }
  //日志内容
  logComment(val){
    return this.httpService.post(APP_SERVE_URL + 'comment.php',val).map((res:Response)=>res.json())
  }
  //userInfo
  userInfo(val){
    return this.httpService.post(APP_SERVE_URL + 'userInfo.php',val).map((res: Response) => res.json());
  }
  //上传照片(base64码)
  uploadPhoto(val){
    return this.httpService.post(APP_SERVE_URL + 'img_base64_fn.php',val).map((res: Response) => res.json());
  }
  //获取图片
  getImgs(val){
    return this.httpService.post(APP_SERVE_URL + 'logImg.php',val).map((res: Response) => res.json());
  }
}