import "View/css/main.css";
import { useEffect, useState } from 'react';

export const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return (() => clearInterval(id))
    }, []);

    return (
        <div className="header_wrap">
            <span>{time.toLocaleTimeString()}</span>
        </div>
    );
}