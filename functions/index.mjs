import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const reverseAPI = {
    method: 'ALL',
    path: '/:_host',
    onRequest: (req, res) => {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        const host = req?.params?._host??'';
        const path = req?.query?._path??'';
        console.log(host, '----', path);
        req.headers.host = host;
        // res.redirect(`https://127.0.0.1${path}`);
        proxy.web(req, res, {
            changeOrigin: true,
            target: `127.0.0.1${path}`,
            // headers: {'Host': host}
        }, function (e) {
            console.log(e);
            res.status(400).send(e);
            proxy.close();
        });
    }
}