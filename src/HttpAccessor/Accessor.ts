enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

interface AccessOption {
  method?:RequestMethod;
  headers?:[string, string][];
}

export default class Accessor {
  private url:string;
  private options:AccessOption;
  constructor(url, options?) {
    this.url = url;
    this.options = {
      method : RequestMethod.GET,
      headers : [],
    };
    this.mergeOptions(options);
  }

  private mergeOptions(options) {
    if (!options) {
      return ;
    }
    for (const optionKey in options) {
      this.options[optionKey] = options[optionKey];
    }
  }

  public setURL(url:string) {
    this.url = url;
  }

  /**
   * 发送ajax请求
   * @param requestBody post方法的请求参数
   * @param callback 拿到response后的回调
   * @returns 如果指定了callback 返回值是包装为Promise的callback的返回值；如果没指定callback，返回值为包装为Promise的response
   */
  public async access(requestBody?:string, callback?:{(response:any):any}) : Promise<any> {

    if (this.options.method === RequestMethod.GET && requestBody !== undefined) {
      throw (new Error('使用GET方法请求时，请求参数应放在URL中'));
    }

    const requestPromise = new Promise<any>(
      (resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
          resolve(this.response);
        };
        xhr.onerror = function () {
          reject(this.statusText);
        };

        xhr.open(this.options.method, this.url);

        for (const header of this.options.headers) {
          xhr.setRequestHeader(header[0], header[1]);
        }

        xhr.send(requestBody);
      });
    const response = await requestPromise;

    if (callback) {
      return callback(response);
    }

    return response;
  }
}
