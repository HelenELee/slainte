//Container does query to get profile data and passes to Profile component
import React, { useEffect } from 'react';
import Profile from './Profile';
//setup for queries
import { useQuery } from '@apollo/client';

import { GET_PROFILE } from '../utils/queries';

const ProfileContainer = (props) => {

    const { loading, error, data, refetch } = useQuery(GET_PROFILE);
    const profile = data?.getProfile || [];
    //force reload so we have the latest profile details to display in form
    useEffect(() => {
       
         if(!loading){
            refetch();
         }
        
    },[] );

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    
    return (
            <Profile profileData={profile}/>
       
    )

};

export default ProfileContainer;