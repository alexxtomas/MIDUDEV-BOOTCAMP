

const Message = (props) => {
    return ( 
    <>
    <h1 style={{ color: props.color }}>
        {props.message}
    </h1>
    <p style={{ color: props.color }}>{props.text}</p>
    </>
    
    )
  }

export default Message;