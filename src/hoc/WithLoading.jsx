import React from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

function WithLoading(WrappedComponent) {
    return (props) => {
        const { pathStore } = props;
        const isLoading = pathStore?.isLoading;
        const activePathStep = pathStore?.activePathStep;
        return (
            <React.Fragment>
                <Navbar>
                    {isLoading && activePathStep && <Loader isLoading />}
                    <WrappedComponent {...props} />
                </Navbar>
            </React.Fragment>
        )
    }
}

export default WithLoading;