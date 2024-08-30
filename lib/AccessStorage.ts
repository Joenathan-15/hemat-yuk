import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetCurrentDate } from "./Date";

export interface Wishlist{
    id: number,
    name: string,
    price: string,
    progress: string,
    monthlyPayment: string,
    wishlistCreated: string
}
export async function StoreMonthlyIncome(income : string){
    const incomeNumber = income.replace(/[,.]/g, '');
    try{
        await AsyncStorage.setItem("MonthlyIncome",incomeNumber)
    }catch(e){
        console.error(e)
    }
}

export async function GetMonthlyIncome(){
    try{
        const income = await AsyncStorage.getItem("MonthlyIncome");
        if (income !== null) {
            return income
          }else{
            return 0
          }    
    }catch (e) {
        console.error(e)
    }
}

export async function StoreSpendingDivider(percentage : Number) {
    const StringPercentage = percentage.toString();
    try{
        await AsyncStorage.setItem("DividerPercentage",StringPercentage)
    }catch(e){
        console.error(e);
    }
}

export async function GetSpendingDivider() {
    try{
        const percentage = await AsyncStorage.getItem("DividerPercentage");
        if(percentage !== null){
            return percentage
        }else{
            return 0
        }
    }catch(e){
        console.error(e);
    }
}

export async function FetchWishlist(){
    try{
        const WishList = await AsyncStorage.getItem("Wishlist")
        return WishList != null ? JSON.parse(WishList) : []
    }catch(e){
        console.error(e);
    }
}


export async function StoreWishlist({name, price, monthlyPayment}:{name:string, price:string,monthlyPayment:number}) {
    const SanitizePrice = price.replace(/[,.]/g, '');
    const Wishlist = await FetchWishlist()
    const WishKey: number = Object.keys(Wishlist).length;
    const date:string = GetCurrentDate();
    console.log(monthlyPayment);
    
    
    const data : object = {"id":WishKey,"name" : name,"price" : SanitizePrice,"monthlyPayment": monthlyPayment,"wishlistCreated":date}
    const newData : Wishlist[] = WishKey == 0 ? [data] : [...Wishlist, data];
    try{
        const stringData = JSON.stringify(newData)
        
        await AsyncStorage.setItem("Wishlist",stringData)
    }catch(e){
        console.error(e);
    }
    
}

export async function getSelectedWishlist(id:string){
    const wishlist = await FetchWishlist();
    var result : Wishlist[] = [];

    for(var i = 0;i < wishlist.length; i++){
        if(wishlist[i].id == id){
            result.push(wishlist[i]);
        }
    }
    
    return result
    
}