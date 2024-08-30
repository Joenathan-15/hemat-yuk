export function GetCurrentDate(){
    const date:number = new Date().getDate();
    const month:number = new Date().getMonth() + 1;
    const year:number = new Date().getFullYear();
    return date + "-" + month + "-" + year
}

export function monthDiff(startingDate : string){
    const currentMonth : number = new Date().getMonth() + 1;
    const currentYear : number = new Date().getFullYear();

    const fromMonth : number = +startingDate.split("-")[1];
    const fromYear : number = +startingDate.split("-")[2];
    
    const result =  currentMonth - fromMonth + 
    (12 * (currentYear - fromYear))
    return result    
}