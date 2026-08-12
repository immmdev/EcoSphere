import React from 'react';
import ProfileTop from '../components/ProfileTop';
import ProfileMiddle from '../components/ProfileMiddle';
import ProfileBottom from '../components/ProfileBottom';
import useDashboardStats from '../hooks/useDashboardStats';

function Profile() {
    const { stats, loading } = useDashboardStats();
    return (
    <div style={{height:"h-full"}} className='p-5 eco-static-bg'>
    <ProfileTop/>
    <ProfileMiddle stats={stats} loading={loading}/>
    <ProfileBottom stats={stats} loading={loading}/>
    </div> );
}

export default Profile;
