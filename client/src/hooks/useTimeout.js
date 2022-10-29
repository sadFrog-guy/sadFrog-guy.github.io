import {useState} from "react";


export default function useTimeout() {

    const [subscribtion, setSubscription] = useState('');
    const [isSubscribtionStarter, setSubscribtionStarter] = useState(false);

    const subscribeTimer = (unix, subscribtionName) => {
        if(unix !== null) {
            const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря"];
            const year = new Date(unix * 1000).getFullYear();
            const month = monthNames[new Date(unix * 1000).getMonth()];
            const day = new Date(unix * 1000).getDate();
            const expire = new Date(unix * 1000);
            let current = new Date();
            const msBetweenDates = Math.abs(expire.getTime() - current.getTime());
            const hoursBetweenDates = Math.floor(msBetweenDates / (60 * 60 * 1000));

            setInterval(() => {
                current = new Date();
            }, 1000 * 60 * 60)

            const getNoun = (n, one, two, five) => {
                if(n >= 5 && n <= 20) {
                    return five;
                };
                if(n === 21) {
                    return one;
                };
                if(n >= 22 && n <= 24) {
                    return two;
                };
                if(n === 1) {
                    return one;
                };
                if(n >= 2 && n <= 4) {
                    return two;
                };

                return five;
            };

            if (hoursBetweenDates <= 24) {
                const noun = getNoun(hoursBetweenDates, 'час', 'часа', 'часов');

                setSubscription(`${subscribtionName} — сгорает через ${hoursBetweenDates} ${noun}`);
            } else {
                setSubscription(`${subscribtionName} — до ${day} ${month}, ${year}`);
            };


            setSubscribtionStarter(false);
        } else {
            setSubscription(subscribtionName);

            setSubscribtionStarter(true);
        };
    };

    return {
        subscribtion,
        isSubscribtionStarter,
        subscribeTimer
    }

}

