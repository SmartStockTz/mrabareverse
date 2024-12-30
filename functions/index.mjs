import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const reverseAPI = {
    method: 'ALL',
    path: '/:_host',
    onRequest: (req, res) => {
        const host = req?.params?._host??'';
        const path = req?.query?._path??'';
        // console.log(`https://185.216.203.193${path}`);
        proxy.web(req, res, {
            changeOrigin: true,
            followRedirects: true,
            ignorePath: true,
            target: `https://185.216.203.193${path}`,
            secure: false,
            headers: {'Host':host},
        }, function (e) {
            console.log(e);
            res.status(400).send(e);
            proxy.close();
        });
    }
}