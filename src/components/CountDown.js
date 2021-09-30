import React from 'react'
// import { ReactReduxContext } from 'react-redux';
// import { actionTime } from '../store/login';

const CountDownTimer = ({ hoursMinSecs }) => {
    // const store = React.useContext(ReactReduxContext);
    const { minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds]);

    const tick = () => {
        if (mins === 0 && secs === 0) {
            setTime([59, 59]);
        } else if (secs === 0) {
            setTime([mins - 1, 59]);
        } else {
            setTime([mins, secs - 1]);
        }
    };


    // const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);


    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });


    return (
        <p style={{
            padding: "0",
            margin: "0"
        }}>{`${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
    );
}

export default CountDownTimer;