import { Button, Card, Input } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { View} from 'react-native';
import { GetMonthlyIncome, StoreMonthlyIncome } from '../../lib/AccessStorage';
import { router, useFocusEffect } from 'expo-router';
export default function EditIncome() {
  const [income , setIncome] = useState<string>("")
  
  useFocusEffect(
    useCallback(() => {
      const GetIncome = async () => {
        const income = await GetMonthlyIncome();
        if (income !== undefined && income !== 0) {
          setIncome(income);
          formatText(income)
        }else{
          setIncome("0")
        }
      };
      GetIncome();
    }, [])
  );

  function formatText(income: string | undefined | null) {
    const sanitizedIncome = income ? income.replace(/[^0-9]/g, '') : '';
    const numberIncome = sanitizedIncome ? parseFloat(sanitizedIncome) : NaN;
    if (!isNaN(numberIncome)) {
      setIncome(numberIncome.toLocaleString('id-ID'));
    } else {
      setIncome(income || '');
    }
  }
    
  function storeIncome(){
    StoreMonthlyIncome(income)
    router.dismiss();
  }

  return (
    <View>
      <Card>
        <Input value={income} onChangeText={(newIncome) => formatText(newIncome)} placeholder='Monthly Income' inputMode='numeric'></Input>
        <Button onPress={storeIncome} size="sm" type="solid">
          Save
        </Button>
      </Card>
    </View>
  );
}
