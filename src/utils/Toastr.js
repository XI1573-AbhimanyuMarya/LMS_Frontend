import React from 'react';    
import { ToastContainer } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    

const Toastr = () => {    
  return (    
      <div>    
        {/* <button  className="btn btn-success btnspace" onClick={()=>toast.success('Success Message')}> Success Message</button>    
        <button   className="btn btn-info btnspace" onClick={()=>toast.info('Info Message')}>Info Message</button>    
        <button  className="btn btn-danger btnspace" onClick={()=>toast.error('Error Message')}>Error Message</button>    
        <button  className="btn btn-warning btnspace" onClick={()=>toast.warning('Success Message')}>Warning Message</button>     */}
        <ToastContainer />    
      </div>    
    );    
}    
export default Toastr;