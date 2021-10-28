import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from "styled-components";


const CardsWrapper = styled.div`
display: flex;
margin: auto;
gap: 10px;
justify-content: center;
`
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
// calculateTimeLeft - function taken from stakoverflow - seems ok to me, I've added types
const calculateTimeLeft = () => {
    let difference = +new Date('12/12/2021') - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

    const cards = [
        { name: 'days', value: days },
        { name: 'hours', value: hours },
        { name: 'minutes', value: minutes },
        { name: 'seconds', value: seconds },

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
                        <Card key={el.name} time={el.value} dataType={el.name} />
                    )
                })}
            </CardsWrapper></div>
    )
}

export default CountDown;
