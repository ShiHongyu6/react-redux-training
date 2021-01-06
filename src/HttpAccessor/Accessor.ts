enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

interface RequestHeader {
  headerKey:string;
  headerVal:string;
}

interface AccessOption {
  method?:RequestMethod;
  headers?:RequestHeader[];
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
    this.options = {
      ...this.options,
      ...options,
    };
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
  public access(requestBody?:string) : Promise<any> {

    if (this.options.method === RequestMethod.GET && requestBody !== undefined) {
      throw (new Error('使用GET方法请求时，请求参数应放在URL中'));
    }

    return  new Promise<any>(
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
          xhr.setRequestHeader(header.headerKey, header.headerVal);
        }

        xhr.send(requestBody);
      },
    );
  }
}
