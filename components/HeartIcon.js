import React from 'https://esm.sh/react@18.2.0';

const HeartIcon = () => {
    return (
        <svg
            className="w-8 h-8 text-red-500 filter drop-shadow-[0_0_5px_#ff0000]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};

export default HeartIcon;