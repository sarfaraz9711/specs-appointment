import React from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';
import DisplayImageWithS3PreSignedUrl from '../../../AwsS3PreSignedUrl';
const ThumbnailImage = ({ containerName, image }) => (
    <>
    {/* <img
        
        src={ `${url}`}

        alt="martfury-image"
        width="100%"
        height="100%"
    /> */}


 <DisplayImageWithS3PreSignedUrl 
imageKey={containerName+image} 
resizeRequired="NO" 
alt={image && image < 40 ? image : image && image.substring(0, 40) + "..."}
/>
    
    </>
);

export default ThumbnailImage;
