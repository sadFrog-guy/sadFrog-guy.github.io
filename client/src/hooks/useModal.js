import {useState} from "react";

export default function useModal() {

    const [modalActive, setModal] = useState(false);
    const modalShow = () => {
        setModal(true);
    };

    const modalHide = () => {
        setModal(false);
    };

    return {
        modalActive,
        modalShow,
        modalHide
    }

}
