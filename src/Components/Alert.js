import React from 'react';

const Capitalize = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export default function Alert(props) {
    return (
        props.alert && (
            <div
                className={`alert alert-${props.alert.type} alert-dismissible fade show`}
                role="alert"
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1050,
                    width: 'auto',
                    maxWidth: '90%',
                    textAlign: 'center',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}
            >
                <strong>{Capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>
        )
    );
}
