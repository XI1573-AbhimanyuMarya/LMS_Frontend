import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const renderList = [1,2,3,4].map((item) => {
    return (
        <Box pl={4} key={item}>
            <Skeleton width="20%"  />
            <Skeleton width="40%" />	
            <Skeleton variant="rect" width={210} height={118} />
        </Box>
    )
})

const CourseSkelton = () => {
    return (
       <Box display="flex" flexDirection="row" m={2}>
           {renderList}
        </Box>    
    )
}

export default CourseSkelton;