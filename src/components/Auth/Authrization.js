import jwt_decode from "jwt-decode";

let allPermission = []

function permissionProcess(){
    const decoded = decodedToken()
    if(decoded){
     decoded.Roles.map( permission=> {   
         permission.permission.map( perm=> {
         allPermission.push(perm) 
         })
         console.log('all aray', allPermission)    
     })   
    }  
}


function decodedToken() {
    const token = window.localStorage.getItem('jwt-token')
    if(token){
        let decoded = jwt_decode(token);
        return decoded
    }
    else{
        return false
    }
 

}
function hasPermission(permission){
 
    const decoded = decodedToken()
   
    if(decoded.is_superAdmin){
        return true
    }
    else{
        return allPermission.includes(permission)
    }
    
}

permissionProcess()
export default hasPermission
