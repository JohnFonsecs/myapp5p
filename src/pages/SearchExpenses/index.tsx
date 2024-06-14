import { useState } from 'react'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'
import { FlatList } from 'react-native'
import { TransactionExpenses } from '../../components/TransactionsExpenses'

export function SearchExpenses() {
  const [category, setCategory] = useState('')
  const [dataExpenses, setDataExpenses] = useState <SpendingStorageDTO[]>([])

  async function handleSearchSpending() {
    if (category.trim() === '') {
      return Alert.alert('Atenção','Favor digite uma categoria.')
    }
    const data = await spendingGetAll()
    const newData = data.filter(dat => dat.category.toLowerCase().includes(category.toLowerCase()))
    if (newData.length === 0) {
      Alert.alert ('Atenção','Categoria inexistente!')
      setCategory('')
      setDataExpenses([])
      return
    }
    setDataExpenses(newData)
  }

  return (
    <Container>
      <Header title='Pesquisa Gastos' />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        value={category}
        onChangeText={value => setCategory(value)}
      />

      <Button
        title='Pesquisa'
        onPress={handleSearchSpending}
      />

      <Transactions>
      <FlatList data={dataExpenses} keyExtractor={item => item.id} 
      renderItem={({ item }) => <TransactionExpenses data={item}/>}
      showsVerticalScrollIndicator={false}/>

      </Transactions>

    </Container>
  )
}

