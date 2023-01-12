import { toast } from 'react-toastify';
import { useTransactions } from '../../hooks/TransactionsContext';
import { Container } from './styles';

export const TransactionsTable = () => {
  const { transactions, deleteTransaction } = useTransactions();

  async function deleteTransactionId(transactionId: any) {
    console.log('oioio', transactionId)
    deleteTransaction(transactionId);
    toast.success('Excluido com sucesso');
  }
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt!)
                )}
              </td>
              <td>
              <button onClick={() => deleteTransactionId(transaction._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}