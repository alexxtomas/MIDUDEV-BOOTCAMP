import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification)
  // const notificationToShow = () => {}
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {props.notification ? <div style={style}>{props.notification}</div> : ''}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications
