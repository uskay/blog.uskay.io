const functions = require('firebase-functions');
const TemplateBuilderFactory = require('./templates/TemplateBuilderFactory');
const returnTemplate = (req, res) => {
    try {
        const factory = new TemplateBuilderFactory(req.url, req.path, req.header("user-agent"));
        const template = factory.getTemplate();
        if(/\.js$/.test(req.path)){
            res.setHeader('content-type', 'text/javascript');
        }
        if(template && template.then) {
            template.then(text => {
                res.status(200).send(text);    
            }).catch(e => {
                throw new Error(e);
            })
            return;
        }
        if(template) {
            res.status(200).send(template);
            return;
        }
        res.status(404).send(factory.get404Template());
    } catch (e) {
        console.log(e);
        res.status(500).send(new TemplateBuilderFactory().get500Template());
    }
};

exports.requestHandler = functions.https.onRequest((req, res) => {
    returnTemplate(req, res);
});

