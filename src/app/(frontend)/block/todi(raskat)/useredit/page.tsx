'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FormInput, FormDisplay } from '../../components/FormSection'
import { TodiState } from '../../components/type'
import Summary from '../../components/Summary'
import Group from '../../components/GroupEdit'
import { Message } from '@/app/(frontend)/components/Message'
import axios from 'axios'

export default function EditTodiPage() {
  const searchParams = useSearchParams()
  const [todi, setTodi] = useState<TodiState>({
    todi_cost: '',
    id: '',
    total_cost: '',
    total_todi_cost: '',
    total_todi_area: '',
    total_block_cost: '',
    total_block_area: '',
    vender_id: '',
    munim: '',
    BlockType: '',
    date: new Date().toISOString(),
    l: '',
    b: '',
    h: '',
    gala_cost: '',
    hydra_cost: '',
    truck_cost: '',
    estimate_cost: '',
    depreciation: '',
    final_cost: '',
    group: [
      {
        g_hydra_cost: '',
        g_truck_cost: '',
        g_total_cost: '',
        g_total_block_area: '',
        date: new Date().toISOString(),
        block: [],
        total_block_area: '',
        total_block_cost: ''
      }
    ]
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodi = async () => {
      const id = searchParams.get('id')
      if (!id) {
        setLoading(false)
        return
      }
  
      try {
        const res = await axios.get<TodiState>(`/api/TodiRaskat/${id}?depth=1`)
        setTodi(res.data)
      } catch (error) {
        setErrorMessage('Failed to fetch Todi data')
        setShowErrorMessage(true)
      } finally {
        setLoading(false)
      }
    }
  
    fetchTodi()
  }, [searchParams])
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!todi || !todi.id) return

    try {
      setIsSubmitting(true)
      
      console.log('Attempting to update Todi with ID:', todi.id)
      console.log('Data to send:', todi)

      // Using the correct API path structure
      const response = await axios.patch(`/api/TodiRaskat/${todi.id}`, todi)
      console.log('Response from server:', response.data)
      
      if (!response.data) {
        throw new Error('Failed to update Todi. No data returned from server')
      }

      setShowSuccessMessage(true)
    } catch (error: any) {
      console.error('Full error details:', error)
      console.error('Response status:', error.response?.status)
      console.error('Response data:', error.response?.data)
      
      setErrorMessage(
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        `Failed to update Todi. Status: ${error.response?.status || 'unknown'}`
      )
      setShowErrorMessage(true)
    } finally {
      setIsSubmitting(false)
    }
  }


  if (showErrorMessage) {
    return (
      <Message 
        setShowMessage={setShowErrorMessage} 
        type='error' 
        message={errorMessage}
      />
    )
  }

  if (showSuccessMessage) {
    return (
      <Message 
        setShowMessage={setShowSuccessMessage} 
        path={'/block/todi(raskat)'} 
        type='success' 
        message='Todi has been updated successfully.'
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className=" max-w-7xl mx-auto p-6 py-4 space-y-6">
      <h1 className="text-xl font-bold">Edit Todi</h1>
      <div className="px-4 py-6 bg-gray-50 dark:bg-black rounded-lg shadow-md max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormInput label="Block Type:" value={todi.BlockType} disabled />
        <FormInput label="Vendor:" value={typeof todi.vender_id === "object" ? todi.vender_id.vendor : ""} disabled />
        <FormInput label="Munim:" value={todi.munim} disabled />
        <FormInput label="L (लम्बाई) - Length (m):" value={todi.l} disabled />
        <FormInput label="Total B (चौड़ाई) - Breadth (m):" value={todi.b} disabled />
        <FormInput label="H (ऊंचाई) - Height (m):" value={todi.h} disabled />
        <FormInput label="Todi Cost (₹):" value={todi.todi_cost ? Number(todi.todi_cost).toLocaleString('en-IN') : ''} disabled />
        <FormInput label="Hydra Cost (₹):" value={todi.hydra_cost} disabled />
        <FormInput label="Truck Cost (₹):" value={todi.truck_cost} disabled />
        <FormDisplay label="Total Todi Area (m³):" value={todi.total_todi_area} />
        <FormDisplay label="Total Todi Cost (₹):" value={todi.total_todi_cost} />
        <FormDisplay label="Estimate Cost (₹):" value={todi.estimate_cost} />
        <FormInput label="Depreciation (%):" value={todi.depreciation} disabled />
        <FormDisplay label="Final Cost (₹):" value={todi.final_cost} />
      </div>

      <Group todi={todi} setTodi={setTodi} />

      <Summary 
        title="Summary"
        totalBlockArea={todi.total_block_area}
        totalBlockCost={todi.total_block_cost}
        remainingAmount={(parseFloat(todi.final_cost || '0') - parseFloat(todi.total_block_cost)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      />

      <button 
        type="submit" 
        className="bg-green-600 text-white px-4 py-2 mt-6"
        disabled={isSubmitting || !todi}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </button>
    </form>
  )
}