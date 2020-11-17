import React from 'react';

import './style.scss'

const ProgressBar = (props) => {
    const { progress } = props;
    let styles = {
        width: "0px",
        backgroundColor: "#e8e8e8",
        display: "none"

    }
    if (progress > 0) {
        styles = {
            width: `${progress}%`,
            backgroundColor: "#67b104",
            display: "block"
        }
    }
    return (
        <div className="meter">
            <span style={styles}>
                {`${progress} %`}
            </span>
        </div>
    )
}

export default ProgressBar;
