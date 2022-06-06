export default function Template(props) {
    let exists, template;
    try {
        template = require("./html-files/" + props.template + ".html");
        exists = true;
    } catch {
        exists = false;
    }
    return (
        <>
            {( exists && <div style={{overflowX: 'scroll'}} dangerouslySetInnerHTML={{ __html: template }} /> )}
        </>
    );
}