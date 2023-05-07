import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Suggestions = () => {

    const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me || [];

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    console.log(userData);
    
    return (
        "Suggestions"
    )
}

export default Suggestions;