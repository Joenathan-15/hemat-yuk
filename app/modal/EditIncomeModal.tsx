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
        } else {
          console.error("Income is either undefined or 0");
        }
      };

      GetIncome();
    }, [])
  );


  function storeIncome(){
    StoreMonthlyIncome(income)
    router.dismiss();
  }

  return (
    <View>
      <Card>
        <Input value={income} onChangeText={(newIncome) => setIncome(newIncome)} placeholder='Monthly Income' inputMode='numeric'></Input>
        <Button onPress={storeIncome} size="sm" type="solid">
          Save
        </Button>
      </Card>
    </View>
  );
}
