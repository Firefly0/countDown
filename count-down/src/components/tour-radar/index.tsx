import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

interface Destionation {
    id: number;
    img_url: string;
    flexible_booking: boolean;
    destinations: String[];
    map_url: string;
    price: number;
    title: string;
    travel_styles: String[];
    regions: String[];
    reviews: { avg: number; cnt: number; sample: string };
    length: number;
    age_min: number;
    age_max: number;
    operated_in: String[];
}

const DestionationsWraper = styled.div`
    text-align: left;
`;

const DestionationItem = styled.div`
    display: flex;
    gap: 5px;
    margin: auto;
    width: 900px;
    margin-bottom: 20px;
    border: 1px solid #bfbfbf;
    box-shadow: 4px 4px 2px #aaaaaa;
`;
const ReviewDescription = styled.span`
    font-style: italic;
`;
const FirstSide = styled.div`
    flex-grow: 1;
`;
const SecondSide = styled.div`
    flex-grow: 2;
`;
const ThirdSide = styled.div`
    flex-grow: 1;
`;
const Header = styled.div`
    border-bottom: 1px solid gray;
`;

const PropsWraper = styled.div`
    display: flex;
    line-height: 1.3;
`;
const Label = styled.b`
    width: 120px;
`;
const Description = styled.span``;

const Button = styled.button`
    padding: 5px 30px;
    background-color: blue;
    font-size: 18px;
    cursor: pointer;
`;
// const
const SearchResult = () => {
    const [data, setData] = useState<Destionation[]>([]);
    useEffect(() => {
        fetch("https://jsonblob.com/api/jsonBlob/892812282795671552")
            .then((res) => {
                res.json().then((data) => {
                    setData(data);
                    console.log(data);
                });
            })
            .catch((er) => {
                console.log(er);
            });
    }, []);

    const onChange = (e: any) => {
        const value = e.target.value;
        const sortData = [...data];
        switch (value) {
            case "lPrice":
                sortData.sort((a: Destionation, b: Destionation) =>
                    a.price > b.price ? 1 : -1
                );
                setData(sortData);
                break;
            case "hPrice":
                sortData.sort((a: Destionation, b: Destionation) =>
                    a.price > b.price ? -1 : 1
                );
                setData(sortData);
                break;
            case "lDuration":
                sortData.sort((a: Destionation, b: Destionation) =>
                    a.length > b.length ? 1 : -1
                );
                setData(sortData);
                break;
            case "hDuration":
                sortData.sort((a: Destionation, b: Destionation) =>
                    a.length > b.length ? -1 : 1
                );
                setData(sortData);
                break;
            default:
                setData(sortData);
        }
    };

    function getDescriptionData(arr: String[]) {
        const newArray = [...arr];
        let more: String = "";
        if (newArray.length > 2) {
            newArray.splice(2);
            more = `+${arr.length - 2} more`;
        }
        return (
            <Description>
                {newArray.map((el) => {
                    return <span>{el + ", "} </span>;
                })}{" "}
                <span>{more}</span>
            </Description>
        );
    }

    return (
        <DestionationsWraper>
            <select onChange={(value) => onChange(value)}>
                <option value="lPrice">Total Price: Lowest First</option>
                <option value="hPrice">Total Price: Highest First</option>
                <option value="lDuration">Duration: Shortest First</option>
                <option value="hDuration">Duration Price: Longest First</option>
            </select>
            {data?.map((el) => {
                return (
                    <DestionationItem>
                        <FirstSide>
                            <img src={el.img_url} />
                            <img src={el.map_url} />
                        </FirstSide>
                        <SecondSide>
                            <Header>
                                <h2>{el.title}</h2>
                                <p>{el.reviews.cnt} reviews</p>
                                <ReviewDescription>
                                    {el.reviews.sample}
                                </ReviewDescription>
                            </Header>
                            <PropsWraper>
                                <Label>Destinations</Label>
                                {getDescriptionData(el.destinations)}
                            </PropsWraper>
                            <PropsWraper>
                                <Label>Age Range</Label>
                                <Description>
                                    {el.age_min +
                                        " to " +
                                        el.age_max +
                                        " year olds"}
                                </Description>
                            </PropsWraper>
                            <PropsWraper>
                                <Label>Regions</Label>
                                {getDescriptionData(el.regions)}
                            </PropsWraper>
                            <PropsWraper>
                                <Label>Travel Style</Label>
                                {getDescriptionData(el.travel_styles)}
                            </PropsWraper>
                            <PropsWraper>
                                <Label>Operated In</Label>
                                <Description>{el.operated_in[0]}</Description>
                            </PropsWraper>
                            <PropsWraper>
                                <Label>Operator</Label>
                                <Description>Hotspots2c</Description>
                            </PropsWraper>
                        </SecondSide>
                        <ThirdSide>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <div>
                                        <p>Tour Length</p>
                                        <b>{el.length}</b>
                                    </div>
                                    <div>
                                        <p style={{ width: "200px" }}>
                                            Price Per day
                                        </p>
                                        <b>
                                            ${Math.floor(el.price / el.length)}
                                        </b>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>From</p>
                                        <b>${Math.floor(el.price)}</b>
                                    </div>
                                </div>
                            </div>
                            <p>Book with Flexibility</p>
                            <Button
                                onClick={() =>
                                    alert(
                                        "Please contact us at this number: 0032[...]"
                                    )
                                }
                            >
                                View tour
                            </Button>
                        </ThirdSide>
                    </DestionationItem>
                );
            })}
        </DestionationsWraper>
    );
};

export default SearchResult;
