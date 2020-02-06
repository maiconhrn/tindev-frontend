import React from 'react';
import { CircleSpinner } from 'react-spinners-kit';
import './Load.css';

export default function Load({ isLoading, size, color, style }) {
    return (
        <>
            {isLoading && (
                <div className="loading" style={style}>
                    <CircleSpinner
                        size={size || 60}
                        color={color || "#df4723"}
                        loading={isLoading || true}
                    />
                </div>
            )}
        </>
    );
}
