import AsyncStorage from "@react-native-async-storage/async-storage";

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