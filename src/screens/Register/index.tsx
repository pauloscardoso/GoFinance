import React from 'react';
import { Keyboard, Modal, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppRoutesParamList } from '../../routes/app.routes';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Form/InputForm';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

export interface FormData {
  [name: string]: string;
}

type RegisterNavigationProps = BottomTabNavigationProp<AppRoutesParamList>;

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export const Register = () => {
  const [transactionType, setTransactionType] = React.useState('');
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);

  const [category, setCategory] = React.useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation<RegisterNavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) return Alert.alert('Selectione o tipo da transação');

    if (category.key === 'category') return Alert.alert('Selectione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    //Persistindo dados offline
    //Fazendo uma tratativa de erros
    try {
      //criação de um alias para a strign '@gofinance:transactions'
      const dataKey = '@gofinance:transactions';
      //Recuperando dados do AsyncStorage
      const data = await AsyncStorage.getItem(dataKey);
      // Convertendo os dados para JSON
      const currentData = data ? JSON.parse(data) : [];

      //Objeto que pega todos os dados que já estavam salvos e recebe a nova transação
      const dataFormatted = [...currentData, newTransaction];

      //Salvando dados no AsyncStorage, porém substuiu toda vez que há um novo cadastro
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              placeholderTextColor="#969CB2"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>

            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
  );
};
