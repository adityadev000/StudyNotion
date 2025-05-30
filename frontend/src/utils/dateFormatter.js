export const formattedDate = (inputDate) => {
    const options =  {
        month : "long" ,
        day : "numeric" , 
        year : "numeric" , 
    }

    const date = new Date(inputDate) ; 

    const formattedDate = date.toLocaleDateString("en-US" , options) ;

    const hour = date.getHours() ;
    const minute = date.getMinutes() ; 
    const period = hour>= 12 ? "PM" : "AM" ; 

    const formattedTime = `${(hour % 12)  || 12 }  : ${minute.toString().padStart(2 , "0")} ${period}`


    return `${formattedDate} | ${formattedTime}`
}