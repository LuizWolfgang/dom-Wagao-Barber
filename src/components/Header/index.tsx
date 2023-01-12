import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => (
  <Container>
    <Content>
      <h1>Finanças barbearia dom wagao</h1>
      <button type="button" onClick={onOpenNewTransactionModal}>
        Nova Transação
      </button>
    </Content>
  </Container>
);