'use client'
import HospitalPage from "@/components/enhanced-hospital-page";
import { Suspense } from 'react';
export default function(){
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <HospitalPage></HospitalPage>
        </Suspense>
    )
    
}