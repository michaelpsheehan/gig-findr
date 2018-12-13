import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'


const Notifications = (props) => {
    const { notifications } = props;

    return (
        <>
            <span className="notifications">Notifications</span>
            <ul >
                {notifications && notifications.map(item => {
                    return (
                        <li key={item.id}>
                            <span >{item.user}  </span>
                            <span> {item.content}</span>
                            <span> {distanceInWordsToNow(item.time.toDate())} ago.</span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Notifications;