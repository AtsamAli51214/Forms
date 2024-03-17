import React, { useState } from 'react'

function PreviewImg({file ,  refz}) {
    const [preview , setPreview] = useState(null);

    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>{
          setPreview(reader.result)
      }
    }
   

  return (
    <div>
       <div className='box' >
      <img src='/bg.png' className='box' />
      <img   onClick={() => {
                refz.current.click();
              }} src={preview ? preview : '/upload.png'} alt='preview' height='200px' width='200px' className='img-for'></img>
      </div>
       
    </div>
  )
}

export default PreviewImg