import { useState, forwardRef } from 'react';
import images from '~/assets/images';

function Image({ src, alt, fallback: customFallback = images.noImage, ...props }, ref) {
    const [fallback, setFallback] = useState('');

    return (
        <img
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={() => {
                setFallback(customFallback);
            }}
        />
    );
}

export default forwardRef(Image);
