import { Message } from 'element-ui';
export default ({$axios,redirect})=>{
    // console.log($axios);
     $axios.onError(err=>{
        //  console.log(err.response);
         const {message,statusCode} = err.response.data;
         if(statusCode === 400){
            Message.error(message);
         }
         if(statusCode === 403 || statusCode === 401 ){
            Message.error('您未登陆,请您先登录后再操作!');
            redirect('/user/login')
         }
     })
    
}