import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { api } from "../services/api";

interface Transactions {
  _id?: number;
  title: string;
  type: string
  category: string
  amount: number;
  createdAt?: string;
}


interface TransactionsProps {
  title: string;
  category: string
  amount: number;
}


// type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transactions[];
  createTransaction: (transaction: Transactions) => void;
  deleteTransaction: (transactionId: Number) => void;
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export const TransactionProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then((response) => {
        setTransactions(response.data)
      });
  }, [deleteTransaction]);


  async function createTransaction(transactionInput: TransactionsProps) {
    const response = await api.post('/transactions', {
      title: transactionInput.title,
      amount: transactionInput.amount,
      category: transactionInput.category
    });

    const { data } = response;
    
    setTransactions([...transactions, data]);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function deleteTransaction(transactionId: Number) {
    console.log('transaction ID',transactionId);
    await api.delete(`/transactions/${transactionId}`);
    console.log('apagou')
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const contex = useContext(TransactionContext);
  return contex;
}