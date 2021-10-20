import React from 'react';
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CardWraper = styled.div`
border: 2px solid black;
padding: 2px 2px 12px;
`

const CardValue = styled.div`
font-size: 52px;
font-weight: bold;
width: 80px;
`

const CardType = styled.span`
font-size: 14px;
`
interface ICardProps {
    time: number | undefined
    dataType: string
}

const Card = (props: ICardProps) => {
    const { time, dataType } = props
    const { t } = useTranslation();
    return (
        <CardWraper>
            <CardValue>{time}</CardValue>
            <CardType>{t(dataType.toUpperCase())}</CardType>
        </CardWraper>
    )
}

export default Card
