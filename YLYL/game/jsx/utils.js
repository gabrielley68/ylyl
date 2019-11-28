export function getPath(path){
    return `/game/${path}`;
}

export class WebSocketHelper {
    constructor(url, onMessage, callback){
        this.url = url;
        this.onMessage = onMessage;
        this.callback = callback;
        this.connect();
    }
    timeout = 250;

    connect = () => {
        var ws = new WebSocket("ws://" + this.url);
        let that = this;
        var connectInterval;

        ws.onopen = () => {
            this.ws = ws;
            that.timeout = 250;
            clearTimeout(connectInterval);
            this.callback(ws);
        };

        ws.onclose = e => {
            console.log(this.url + " closed", e.reason);

            that.timeout = that.timeout + that.timeout;
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
        };

        ws.onerror = err => {
            console.error(this.url + " error", err.message);
            ws.close();
        };

        ws.onmessage = this.onMessage
    };

    check = () => {
        if(!this.ws || this.ws.readyState == WebSocket.CLOSED) this.connect();
    };
}