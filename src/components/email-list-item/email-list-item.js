let styles = {
  borderTop: '1px solid grey',
  borderBottom: '1px solid grey'
};

export default function EmailListItem(props) {
  return (
    <>
      <div
        onClick={() => props.onClick(props.index)}
        style={Object.assign({}, styles, props.isSelected ? { borderColor: 'blue', backgroundColor: 'lightgrey' } : {})}
      >
        <h1>{props.email.title}</h1>
        <h2>Welcome To us</h2>
        <p>This is the email body...</p>
      </div>
    </>
  );
}
