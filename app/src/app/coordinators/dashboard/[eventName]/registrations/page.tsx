"use client"
import React from 'react'
import UserDetailsTable from "@/components/datatable/table"
import { usePathname } from 'next/navigation'

const page = () => {
  const pathName = usePathname()
  const eventName = pathName.split("/")[3]

  return (
    <div>
        <UserDetailsTable eventName={eventName}/>
      
    </div>
  )
}

export default page
