import axios from "axios";
import { useEffect, useState } from "react";

export default (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios
            .get(url)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { response, error, loading };
};


