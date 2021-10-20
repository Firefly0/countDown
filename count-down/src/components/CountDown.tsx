import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from "styled-components";


const CardsWrapper = styled.div`
display: flex;
margin: auto;
gap: 10px;
justify-content: center;
`

// calculateTimeLeft - function taken from stakoverflow - seems ok to me, I've added types
const calculateTimeLeft = () => {
    let difference = +new Date('12/12/2021') - +new Date();
    let timeLeft: { days?: number, hours?: number, minutes?: number, seconds?: number } = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;

}

const CountDown = () => {
    const [days, setDays] = useState<number | undefined>()
    const [hours, setHours] = useState<number | undefined>()
    const [minutes, setMinutes] = useState<number | undefined>()
    const [seconds, setSeconds] = useState<number | undefined>()

    const cards = [
        { name: 'seconds', value: seconds, setValue: setSeconds },
        { name: 'minutes', value: minutes, setValue: setMinutes },
        { name: 'hours', value: hours, setValue: setHours },
        { name: 'days', value: days, setValue: setDays },

    ]
    useEffect(() => {
        setTimeout(() => {
            const newTime = calculateTimeLeft()
            setSeconds(newTime.seconds)
            setMinutes(newTime.minutes)
            setHours(newTime.hours)
            setDays(newTime.days)
        }, 1000)
    }, [seconds])

    return (
        <div>
            <CardsWrapper>
                {cards.map(el => {
                    return (
                        <Card time={el.value} dataType={el.name} />
                    )
                })}
            </CardsWrapper></div>
    )
}

export default CountDown;
