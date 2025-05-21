import React from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

const ModalManager = ({data,type,closeModal,isModal}) => {
  
    switch(type){
        case 'deleteuser': 

          return ( <DeleteModal data={data} isModal={isModal} closeModal={closeModal}  />)
        
        case 'edituser': 
           return ( <EditModal data={data} isModal={isModal} closeModal={closeModal} />)
    }
}

export default ModalManager