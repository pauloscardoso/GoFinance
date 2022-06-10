import React from 'react';
import { Keyboard, Modal, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Form/InputForm';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';


export interface FormData {
  [name: string]: string;
}

const schema = yup.object().shape({
  name: yup
  .string()
  .required('Nome é obrigatório'),
  amount: yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export const Register = () => {
  const [transactionType, setTransactionType] = React.useState('')
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false)

  const [category, setCategory] = React.useState({
    key: 'category',
    name: 'Categoria',
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  }

  const handleRegister = (form: FormData) => {
    if(!transactionType)
      return Alert.alert('Selectione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selectione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return(
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{flex: 1}}
      style={{flex: 1}}
    >
      <Container>
          <Header>
            <Title>Cadastro</Title>
          </Header>

          <Form>
            <Fields>

              <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                placeholderTextColor="#969CB2"
                autoCapitalize='sentences'
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                name="amount"
                control={control}
                placeholder="Preço"
                placeholderTextColor="#969CB2"
                keyboardType='numeric'
                error={errors.amount && errors.amount.message}
              />

              <TransactionTypes>
                <TransactionTypeButton
                  type='up'
                  title='Income'
                  onPress={() => handleTransactionTypeSelect('up')}
                  isActive={transactionType === 'up'}
                />
                <TransactionTypeButton
                  type='down'
                  title='Outcome'
                  onPress={() => handleTransactionTypeSelect('down')}
                  isActive={transactionType === 'down'}
                />
              </TransactionTypes>

              <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />

            </Fields>

            <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
          </Form>

          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
