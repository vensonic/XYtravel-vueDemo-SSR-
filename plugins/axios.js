import { Message } from 'element-ui';
export default ({$axios})=>{
    // console.log($axios);
     $axios.onError(err=>{
        //  console.log(err.response);
         const {message,statusCode} = err.response.data;
         if(statusCode === 400){
            Message.error(message);
         }
     })
    
}