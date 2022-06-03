const template = require('./html-files/royalmail.html');

export default function Template() {
    return (
        <iframe src={template}></iframe>   /* like this */
    );
}