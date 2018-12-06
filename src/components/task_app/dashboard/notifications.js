import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications } = props;
    // const date = notifications.time.toDate();
    // console.log('the notification.time in the notification component is',
    //     notifications
    //     //  .time.toDate().toString()
    // )
    return (
        <>
            {/* // <div className="section"> */}
            {/* // <div className="card z-depth-0"> */}
            {/* // <div className="card-content"> */}
            <span className="card-title">Notifications</span>
            <ul >
                {notifications && notifications.map(item => {
                    return (
                        <li key={item.id}>
                            <span >{item.user}  </span>
                            <span> {item.content}

                            </span>
                            <span> {moment(item.time.toDate()).fromNow()}</span>
                            {/* <span>{console.log(item.time)}</span> */}
                            {/* <div className="grey-text note-date">{item.time}</div> */}
                        </li>
                    )

                })}

            </ul>
            {/* // </div> */}
            {/* // </div> */}

            {/* </div> */}


        </>
    )
}

export default Notifications;