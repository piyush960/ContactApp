import { useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputAdornment, TextField } from '@mui/material';
import { create_contact, update_contact } from '../services/ContactService'
import { AccountCircle, Apartment, Email, LocalPhone, Person, Work } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const initialState = {
  first_name: '',
  last_name: '',
  phone_number: '',
  company: '',
  email: '',
  job_title: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'FIRSTNAME':
      return {...state, first_name: action.payload}
    case 'LASTNAME':
      return {...state, last_name: action.payload}
    case 'MOBILE':
      return {...state, phone_number: action.payload}
    case 'EMAIL':
      return {...state, email: action.payload}
    case 'COMPANY':
      return {...state, company: action.payload}
    case 'JOBTITLE':
      return {...state, job_title: action.payload}
  }
}

export default function FormModal({isOpen, setIsOpen, data, mode, onReload, setIsToastOpen, setToastMsg}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleClose = () => setIsOpen(false);

  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const phonePattern = /^\d{10}$/;
  const namePattern =  /^[a-zA-Z ]{2,30}$/;
  const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    if(data){
      dispatch({type: 'FIRSTNAME', payload: data.first_name})
      dispatch({type: 'LASTNAME', payload: data.last_name})
      dispatch({type: 'EMAIL', payload: data.email})
      dispatch({type: 'MOBILE', payload: data.phone_number})
      dispatch({type: 'COMPANY', payload: data.company})
      dispatch({type: 'JOBTITLE', payload: data.job_title})
    }
    else{
      clearFields()
    }
  }, [data])

  const clearFields = () => {
    dispatch({type: 'FIRSTNAME', payload: ''})
    dispatch({type: 'LASTNAME', payload: ''})
    dispatch({type: 'EMAIL', payload: ''})
    dispatch({type: 'MOBILE', payload: ''})
    dispatch({type: 'COMPANY', payload: ''})
    dispatch({type: 'JOBTITLE', payload: ''})
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const pe = phonePattern.test(state.phone_number)
    const ee = emailPattern.test(state.email)
    const fne = namePattern.test(state.first_name)
    const lne = namePattern.test(state.last_name)
    setPhoneError(!pe)
    setEmailError(!ee)
    setFirstNameError(!fne)
    setLastNameError(!lne)
    if(!pe || !ee || !fne || !lne){
      setToastMsg('Invalid Entries')
      setIsToastOpen(true)
      return
    }
    try{
      if(mode === 'add'){
        const response = await create_contact(state)
        handleClose()
        onReload()
        if(response.data.success){
          setToastMsg('Added Successfully')
          setIsToastOpen(true)
          clearFields()
        }
        else{
          setToastMsg('Failed: ' + response.data.message)
          setIsToastOpen(true)
        }
      }
      else if(mode === 'edit'){
        const response = await update_contact(data.id, state)
        console.log(response)
        handleClose()
        onReload()
        if(response.data.success){
          setToastMsg('Updated Successfully')
          setIsToastOpen(true)
        }
        else{
          setToastMsg('Failed: ' + response.data.message)
          setIsToastOpen(true)
        }
      }
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} 
        bgcolor={'background.default'} color={'text.primary'}
        >
          <Typography align="center" fontFamily={'Poppins'} variant="h6" sx={{ mb: 2 }}>
            {mode === 'edit' ? `Edit` : `Add New`} Contact
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2, 
            }}
            autoComplete="off"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <TextField required id="outlined-basic" error={firstNameError} slotProps={{input: {startAdornment: (<InputAdornment position="start"><Person /></InputAdornment>),},}} label="First Name" variant="outlined" value={state.first_name} onChange={(e) => dispatch({type: 'FIRSTNAME', payload: e.target.value})}/>
            <TextField required id="outlined-basic" error={lastNameError} slotProps={{input: {startAdornment: (<InputAdornment position="start"><Person /></InputAdornment>),},}} label="Last Name" variant="outlined" value={state.last_name} onChange={(e) => dispatch({type: 'LASTNAME', payload: e.target.value})}/>
            <TextField required id="outlined-basic" error={emailError} slotProps={{input: {startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>),},}} label="Email" variant="outlined" value={state.email} onChange={(e) => dispatch({type: 'EMAIL', payload: e.target.value})}/>
            <TextField id="outlined-basic" error={phoneError} slotProps={{input: {startAdornment: (<InputAdornment position="start"><LocalPhone /></InputAdornment>),},}} label="Mobile No." variant="outlined" value={state.phone_number} onChange={(e) => dispatch({type: 'MOBILE', payload: e.target.value})}/>
            <TextField id="outlined-basic" slotProps={{input: {startAdornment: (<InputAdornment position="start"><Apartment /></InputAdornment>),},}} label="Company" variant="outlined" value={state.company} onChange={(e) => dispatch({type: 'COMPANY', payload: e.target.value})}/>
            <TextField id="outlined-basic" slotProps={{input: {startAdornment: (<InputAdornment position="start"><Work /></InputAdornment>),},}} label="Job Title" variant="outlined" value={state.job_title} onChange={(e) => dispatch({type: 'JOBTITLE', payload: e.target.value})}/>
            <Button variant='contained' color='secondary' type='submit' sx={{my: 1, gridColumnStart: 2, position: 'relative', widht: 10, ml: 22}}>{mode.toUpperCase()}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

