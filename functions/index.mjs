import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const reverseAPI = {
    method: 'ALL',
    path: '/:_host',
    onRequest: (req, res) => {
        const host = req?.params?._host??'';
        const path = req?.query?._path??'';
        proxy.web(req, res, {
            changeOrigin: true,
            followRedirects: true,
            ignorePath: true,
            target: `https://127.0.0.1${path}`,
            secure: false,
            headers: {'Host':host},
        }, function (e) {
            console.log(e);
            res.status(400).send(e);
            proxy.close();
        });
    }
}