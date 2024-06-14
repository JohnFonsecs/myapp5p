import { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { InputDate } from '../../components/InputDate'
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll';

export function Dashboard() {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [datePurchase, setDatePurchase] = useState('')
  const [category, setCategory] = useState('')
  const [local, setLocal] = useState('')

  async function handleAddNewSpending() {

    // limpar o AsyncStorage no IOS
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // Alert.alert('Atencao', 'Programa finalizado !!')
    // return

    // limpa o AsyncStorage no Android
    // await AsyncStorage.clear()
    // Alert.alert('Atencao', 'Programa finalizado !!')
    // return


    if (name.trim() === '' || amount.trim() === ''
      || datePurchase.trim() === '' || category.trim() === ''
      || local.trim() === '') {
      return Alert.alert('Atencao',
        'Todos os campos devem ser preenchidos')
    }

    const data = {
      id: String(new Date().getTime()),
      name,
      amount,
      datePurchase,
      category,
      local
    }

    setName('')
    setAmount('')
    setDatePurchase('')
    setCategory('')
    setLocal('')

    await spendingCreate(data)
    const result = await spendingGetAll()
    console.log(result)
  }

  return (
    <Container
    >
      <Header title='Controle de Gastos' />

      <Input
        placeholder='Descrição'
        placeholderTextColor='#363F5F'
        value={name}
        onChangeText={value => setName(value)}
      />

      <InputAmount
        placeholder='Valor'
        placeholderTextColor='#363F5F'
        value={amount}
        onChangeText={value => setAmount(value)}
      />

      <InputDate
        placeholder='Data Compra'
        placeholderTextColor='#363F5F'
        value={datePurchase}
        onChangeText={value => setDatePurchase(value)}
      />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        value={category}
        onChangeText={value => setCategory(value)}
      />

      <Input
        placeholder='Local da Compra'
        placeholderTextColor='#363F5F'
        value={local}
        onChangeText={value => setLocal(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}