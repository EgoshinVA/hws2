import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [newInterval, setNewInterval] = useState<any>(null)

    useEffect(() => {
        return () => {
            if (newInterval) {
                clearInterval(newInterval);
            }
        };
    }, []);

    const start = () => {
        if (newInterval) return;

        setNewInterval(setInterval(() => {
            setDate(new Date(restoreState('hw9-date', Date.now())));
        }, 1000))
    }

    const stop = () => {
        if (newInterval) {
            clearInterval(newInterval);
            setNewInterval(null)
        }
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => {
        setShow(false)
    }

    const getTime = (time: number) => time < 10 ? '0' + time : time

    const stringTime = getTime(date.getHours()) + ':' + getTime(date.getMinutes()) + ':' + getTime(date.getSeconds()) ||
        <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = getTime(date.getDate()) + '.' + getTime(date.getMonth() + 1) + '.' + date.getFullYear() || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    const stringDay = date.toLocaleString('default', {weekday: 'long'}) || <br/> // пишут студенты
    const stringMonth = date.toLocaleString('default', {month: 'long'}) || <br/> // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={newInterval}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!newInterval}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
