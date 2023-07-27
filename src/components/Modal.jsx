import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children }) {
    //when displayed we want to hide overflow so that scroll is disabled
    useEffect(() => {
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div className='fixed inset-0 bg-gray-300 opacity-80'></div>
            <div className='fixed inset-40 p-10 bg-white'>
                <div className='flex flex-col justify-center items-center h-full'>
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector(".modal-container")
    );
}

export default Modal;
