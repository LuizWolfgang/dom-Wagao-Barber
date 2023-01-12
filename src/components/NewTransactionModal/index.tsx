import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { useTransactions } from '../../hooks/TransactionsContext';
import closeImg from '../../assets/close.svg';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Container, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmout] = useState(0);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    
    if(!title || !amount || !category){
      return alert('Todos os campos devem estar')
    }
    
    setLoading(true)
    console.log('category', category)
    await createTransaction({ type, title, amount, category });

    setType('deposit');
    setTitle('');
    setAmout(0);
    setCategory('');
    onRequestClose();
    setLoading(false)
  }


  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechal modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Adicionar nova transaçação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={({ target }) => setAmout(Number(target.value))}
        />

        <TransactionTypeContainer>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Selecione a categoria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Selecione a categoria:"
              onChange={handleChange}
            >
              <MenuItem value="WAGAO">WAGAO</MenuItem>
              <MenuItem value="ALISSON">ALISSON</MenuItem>
              <MenuItem value="BEBIDAS">BEBIDAS</MenuItem>
            </Select>
          </FormControl>
         </Box>
        </TransactionTypeContainer>

        <button 
          disabled={loading}
          type="submit">
            Cadastrar
        </button>
      </Container>
    </Modal>
  );
}