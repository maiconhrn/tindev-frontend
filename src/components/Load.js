import React from 'react';
import { CircleSpinner } from 'react-spinners-kit';
import './Load.css';

export default function Load(props) {
    return props.loading && (
        <div className="loading">
            <CircleSpinner
                size={props.size || 60}
                color={props.color || "#df4723"}
                loading={props.loading}
            />
        </div>
    );
}
