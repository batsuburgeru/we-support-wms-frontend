import React from 'react'
import { AllOrders, ApprovedRequests, DeniedRequests, PendingRequests, ReturnedRequests } from '@/components/custom-icons/Icons'
import { TrendingUp } from 'lucide-react'

const chooseIcon = (iconType) => {
  switch(iconType) {
    case 'AllOrders':
      return AllOrders
    case 'ApprovedRequests':
      return ApprovedRequests
    case 'DeniedRequests':
      return DeniedRequests
    case 'PendingRequests':
      return PendingRequests
    case'ReturnedRequests':
      return ReturnedRequests
    default:
      return AllOrders
  }
}
const DashboardCard = (props) => {
  const IconComponent = chooseIcon(props.icon)
  return (
    <div className='bg-white rounded-2xl p-4 2xl:p-6 flex-col justify-between'>
      <div className='flex items-center gap-3 mb-5'>
        <IconComponent />
        <h2>{props.title}</h2>
      </div>
      <div className='flex justify-between'>
        <h1 className='font-semibold'>{props.value}</h1>
      </div>
    </div>
  )
}

export default DashboardCard