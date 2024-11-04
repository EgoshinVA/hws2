import React from 'react'
import s from './FriendMessage.module.css'
import {MessageType} from "../HW1";

type FriendMessagePropsType = {
    message: MessageType
}
// создать тип вместо any и отобразить приходящие данные
const FriendMessage = (props: FriendMessagePropsType) => {
    return (
        <div id={'hw1-friend-message-' + props.message.id} className={s.friendMessage}>
            <div className={s.friendImageAndText}>
                <img id={'hw1-friend-avatar-' + props.message.id}
                    src={props.message.user.avatar}
                    alt={'avatar'}/>
                <div className={s.friendText}>
                    <div id={'hw1-friend-name-' + props.message.id} className={s.friendName}>
                        <p>{props.message.user.name}</p>
                    </div>
                    <pre id={'hw1-friend-text-' + props.message.id}
                        className={s.friendMessageText}>
                        <p>{props.message.message.text}</p>
                    </pre>
                </div>
            </div>
            <div id={'hw1-friend-time-' + props.message.id} className={s.friendTime}>
                <p>{props.message.message.time}</p>
            </div>
        </div>
    )
}

export default FriendMessage
