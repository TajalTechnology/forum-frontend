import React, { Component } from 'react';

function InvalidFeedBack({message}) {
    return (
        <div className="invalid-feedback custom_invalid-feedback">
        {message}
    </div>
    )
}

export default InvalidFeedBack