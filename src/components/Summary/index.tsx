

import { useTransactions } from '../../hooks/TransactionsContext';

import { Container } from "./styles";

import incomeImg from '../../assets/income.svg';
// import outcomeImg from '../../assets/outcome.svg';
// import totalImg from '../../assets/total.svg';

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.category === "WAGAO") {
      acc.wagao += transaction.amount;
      acc.total += transaction.amount;

      return acc;
    }

    if(transaction.category === "ALISSON"){
      acc.alisson += transaction.amount;
      acc.total += transaction.amount;

      return acc;
    }

    if(transaction.category === "BEBIDAS"){
      acc.bebidas += transaction.amount;
      acc.total += transaction.amount;

      return acc;
    }
    // else {
    //   acc.deposits += transaction.amount;
    //   acc.total += transaction.amount;
    // }

    console.log('acc', acc)
    return acc;
  }, {
    wagao: 0,
    alisson: 0,
    bebidas: 0,
    withdraws: 0,
    total: 0
  });

  return (
    <Container>
      <div>
        <header>
          <p>Cortes wagao</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.wagao)}
        </strong>
      </div>

      <div>
        <header>
          <p>Cortes alisson</p>
          <img src={incomeImg} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.alisson)}
        </strong>
      </div>

      <div>
        <header>
          <p>Bebidas</p>
          <img src={incomeImg} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.bebidas)}
        </strong>
      </div> 

      {/* <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div> */}
    </Container>
  );
}
