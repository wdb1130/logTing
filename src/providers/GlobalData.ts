import {Injectable} from '@angular/core';

@Injectable()
export class GlobalData {
  private _userId: string;//用户id
  private _username: string;//用户名
  private _token: string;//token
  private _showLoading: boolean = true;//请求是否显示loading,注意:设置为true,当请求执行后需要设置为false
  private _workSheetType: string;//工作票类型
  private _workSheetState: string;//工作票状态
  private _opSheetType: string;//操作票类型
  private _opSheetState: string;//操作票状态
  private _faultLiucheng: string;//缺陷流程
  private _faultType: string;//缺陷类型

  get workSheetState(): string {
    return this._workSheetState;
  }

  set workSheetState(value: string) {
    this._workSheetState = value;
  }

  get workSheetType(): string {
    return this._workSheetType;
  }

  set workSheetType(value: string) {
    this._workSheetType = value;
  }

  get opSheetState(): string {
    return this._opSheetState;
  }

  set opSheetState(value: string) {
    this._opSheetState = value;
  }

  get opSheetType(): string {
    return this._opSheetType;
  }

  set opSheetType(value: string) {
    this._opSheetType = value;
  }

  get faultLiucheng(): string {
    return this._faultLiucheng;
  }

  set faultLiucheng(value: string) {
    this._faultLiucheng = value;
  }

  get faultType(): string {
    return this._faultType;
  }

  set faultType(value: string) {
    this._faultType = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }
}
