import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <ExpensesForm />
        <Table />
      </main>
    );
  }
}

export default Wallet;
