import React from 'react';
import Loader from '../components/Loader';

function WithLoading(WrappedComponent) {
    return (props) => {
        const {isLoading} = props;
        return (
            <React.Fragment>
                { isLoading && <Loader isLoading/>}
                <WrappedComponent {...props}/>
            </React.Fragment>
        )
    }
}

export default WithLoading;