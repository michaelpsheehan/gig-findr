import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications } = props;

    return (
        <>

            <span className="card-title">Notifications</span>
            <ul >
                {notifications && notifications.map(item => {
                    return (
                        <li key={item.id}>
                            <span >{item.user}  </span>
                            <span> {item.content}

                            </span>
                            <span> {moment(item.time.toDate()).fromNow()}</span>

                        </li>
                    )

                })}

            </ul>



        </>
    )
}

export default Notifications;