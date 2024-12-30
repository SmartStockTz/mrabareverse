import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const reverseAPI = {
    method: 'ALL',
    path: '/:_host',
    onRequest: (req, res) => {
        const host = req?.params?._host??'';
        const path = req?.query?._path??'';
        console.log(host, '----', path);
        proxy.web(req, res, {
            /*changeOrigin: true,*/
            target: `127.0.0.1${path}`,
            headers: {'Host': host}
        }, function (e) {
            res.status(400).send(e);
            proxy.close();
        });
    }
}