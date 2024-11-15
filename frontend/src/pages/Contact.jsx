import { Add } from '@mui/icons-material'
import { Box, Button, Container, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import FormModal from '../components/FormModal'
import ContactTable from '../components/ContactTable'

const Contact = () => {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState('')
	const [modalData, setModalData] = useState('')
	const [reload, setReload] = useState(false)
	const [isToastOpen, setIsToastOpen] = useState(false)
	const [toastMsg, setToastMsg] = useState('false')

	const handleModalOpen = (data, mode) => {
		setOpen(true)
		setModalData(data)
		setMode(mode)
	}

	const handleReload = () => {
		setReload(prev => !prev)
	}

	const handleToastClose = () => {
		setIsToastOpen(false)
	}

  return (
    <Container maxWidth='xl'>
			<Snackbar
        open={isToastOpen}
        autoHideDuration={5000}
        onClose={handleToastClose}
        message={toastMsg}
      />
			<Button variant="contained" color='secondary' onClick={() => handleModalOpen("", "add")} startIcon={<Add />} sx={{my: 1}}>
				<Typography fontSize={'small'} fontWeight={600} fontFamily={'Poppins'}>Add New</Typography>
			</Button>
			<ContactTable onOpenModal={handleModalOpen} reload={reload} setToastMsg={setToastMsg} setIsToastOpen={setIsToastOpen}/>
			<FormModal isOpen={open} setIsOpen={setOpen} data={modalData} mode={mode} onReload={handleReload} setToastMsg={setToastMsg} setIsToastOpen={setIsToastOpen}/>
    </Container>
  )
}

export default Contact