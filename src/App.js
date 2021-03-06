import "./App.css";
import "antd/dist/antd.css";
import { List, Card, Button } from "antd";
import React, { useState, useEffect } from "react";

//const fetchData = await fetch("https://swapi.dev/api/people/1");

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        fetch("https://swapi.dev/api/people/1")
            .then((response) => {
                if (response.ok) {
                    const resp = response.json();
                    //console.log(resp);
                    return resp;
                }
                throw response;
            })
            .then((data) => {
                //console.log("dataB: ", data);
                //setData((data) => [...data, `${data.length}`]);
                setData([data]);
                //console.log("dataA: ", data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return "Loading...";
    if (error) return "Error!";

    function getChara() {
        setBtnLoading(true);
        let number = Math.round(Math.random() * (82 - 1) + 1);
        //console.log("rand: ", number);
        fetch("https://swapi.dev/api/people/" + number)
            .then((response) => {
                if (response.ok) {
                    const resp = response.json();
                    //console.log(resp);
                    return resp;
                }
                throw response;
            })
            .then((respData) => {
                //console.log("dataB: ", respData);
                //setData((data) => [...data, `${data.length}`]);
                setData([...data, respData]);
                //console.log("dataA: ", respData);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                setBtnLoading(false);
            });
    }

    function clearChara() {
        setData([]);
    }

    return (
        <div className="App">
            <header>
                <h1>StarWars Characters</h1>
            </header>
            <div className="buttons">
                <Button onClick={getChara} loading={btnLoading}>
                    Get Random Character
                </Button>
                <Button onClick={clearChara}>Clear</Button>
            </div>

            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.name}>
                            <span>Birth Year: {item.birth_year}</span>
                            <br />
                            <span>Height: {item.height}</span>
                            <br />
                            <span>Weight: {item.mass}</span>
                            {/* <span>{`${item.startTime} - ${item.endTime}`}</span> */}
                        </Card>
                    </List.Item>
                )}
            />
            <footer>
                <p>(c) Sandro Vlastelica - 2021</p>
            </footer>
        </div>
    );
}

export default App;
