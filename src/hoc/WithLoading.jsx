import React from 'react';
import Loader from '../components/Loader';

function WithLoading(WrappedComponent) {
    return (props) => {
        const { pathStore } = props;
        const isLoading = pathStore?.isLoading;
        const activePathStep = pathStore?.activePathStep;
        return (
            <React.Fragment>
                { isLoading && activePathStep && <Loader isLoading/>}
                <WrappedComponent {...props}/>
            </React.Fragment>
        )
    }
}

export default WithLoading;