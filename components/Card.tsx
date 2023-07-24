import Image from 'next/image';
import { useState } from 'react';

const Card = () => {
    const [isOpen, setIsOpen] = useState(true);

    const images = [
        "https://www.sunshinedeliver.com/media/restaurant_logo/9Y1A2172.jpg", 
        "https://www.sunshinedeliver.com/media/restaurant_logo/Logotipos_SD.png", 
        "https://www.sunshinedeliver.com/media/restaurant_logo/images_1.jpeg", 
        "https://www.sunshinedeliver.com/media/restaurant_logo/logo.jpeg",
        // Add more image URLs here
    ];

    return (
        <div className="overflow-auto whitespace-nowrap">
            {images.map((url, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 inline-block mr-4">
                    <div className="top-0 left-0 p-2 bg-blue-500 text-white uppercase font-bold text-xs rounded-br-lg">
                        {isOpen ? 'Opened' : 'Closed'}
                    </div>

                    <div className="w-64 h-48 relative">
                        <Image src={url} alt={`Card Image ${index}`} layout="fill" objectFit="cover" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">Card Title {index+1}</h3>
                    <p className="text-gray-600">Card description goes here.</p>
                </div>
            ))}
        </div>
    );
};

export default Card;
