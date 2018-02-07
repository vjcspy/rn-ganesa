import {injectable} from "inversify";
import {Observable} from "rxjs";
import {NotifyManager} from "./notify-manager";
import {app} from "../../general/app";

@injectable()
export class RequestService {
    protected header;

    constructor(protected notify: NotifyManager) {
    }

    getRequestOptions() {
        if (typeof this.header === 'undefined') {
            this.header = new Headers();
            // this.header.append("Black-Hole", "mr.vjcspy@gmail.com");
            this.header.append("Content-Type", "text/plain");
        }

        return {headers: this.header};
    }

    _prepareUrl(url: string): string {
        url += url.indexOf('?') > -1 ?
            `&forceFullPageCache=${Date.now()}&token_key=${btoa('mr.vjcspy@gmail.com')}` :
            `?forceFullPageCache=${Date.now()}&token_key=${btoa('mr.vjcspy@gmail.com')}`;

        return url;
    }

    makeGet(url, option?: any) {
        url = this._prepareUrl(url);

        return Observable.fromPromise(fetch(url, Object.assign({method: 'GET'}, this.getRequestOptions(), option)))
                         .switchMap((res: Response) => {
                             return Observable.fromPromise(res.json());
                         })
                         .catch(
                             (error: any) => {
                                 let errMsg;
                                 if (error['status'] === 0) {
                                     this.notify.error('Internal Server Error');
                                 } else {
                                     if (error.status === 400 && error.hasOwnProperty('_body')) {
                                         let _mess = JSON.parse(error['_body']);
                                         if (_mess.error === true) {
                                             this.notify.error(_mess['message'], null, {
                                                 newestOnTop: false,
                                                 showCloseButton: true,
                                                 enableHTML: true
                                             });
                                         } else {
                                             this.notify.error('unknown_error');
                                         }
                                     } else {
                                         errMsg = (
                                             error.message) ? error.message :
                                             error.status ? `${error.status} - ${error.statusText}` : 'Server not responding';
                                         this.notify.error(errMsg, "Opp!");
                                     }
                                 }
                                 return Observable.throw(error);
                             });
    }

    makePost(url, data: any, showError: boolean = true) {
        url = this._prepareUrl(url);

        return Observable.fromPromise(fetch(url, Object.assign({
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data)
        }, this.getRequestOptions())))
                         .switchMap((res: Response) => {
                             return Observable.fromPromise(res.json());
                         })
                         .catch(
                             (error: any) => {
                                 if (showError) {
                                     if (error['status'] === 0) {
                                         this.notify.error('Internal Server Error');
                                     } else {
                                         if (error.status === 400 && error.hasOwnProperty('_body')) {
                                             let _mess = JSON.parse(error['_body']);
                                             if (_mess.error === true) {
                                                 this.notify.error(_mess['message'], null, {
                                                     newestOnTop: false,
                                                     showCloseButton: true,
                                                     enableHTML: true
                                                 });
                                             } else {
                                                 this.notify.error('unknown_error');
                                             }
                                         } else {
                                             this.notify.error('server_not_responding');
                                         }
                                     }
                                 }
                                 return Observable.throw(error);
                             });
    }

    makeDelete(url) {
        url = this._prepareUrl(url);

        return Observable.fromPromise(fetch(url, Object.assign({method: 'DELETE'}, this.getRequestOptions())))
                         .switchMap((res: Response) => {
                             return Observable.fromPromise(res.json());
                         })
                         .catch(
                             (error: any) => {
                                 return Observable.throw(error);
                             });
    }

    makePut(url, data: any) {
        url = this._prepareUrl(url);

        return Observable.fromPromise(fetch(url, Object.assign({
            method: 'PUT',
            body: JSON.stringify(data)
        }, this.getRequestOptions())))
                         .switchMap((res: Response) => {
                             return Observable.fromPromise(res.json());
                         })
                         .catch(
                             (error: any) => {
                                 if (error['status'] === 0) {
                                     this.notify.error('Internal Server Error');
                                 } else {
                                     // In a real world app, we might use a remote logging infrastructure
                                     // We'd also dig deeper into the error to get a better message
                                     let errMsg = (
                                         error.message) ? error.message :
                                         error.status ? `${error.status} - ${error.statusText}` : 'Server not responding';
                                 }
                                 return Observable.throw(error);
                             });
    }
}

app().register(RequestService);
