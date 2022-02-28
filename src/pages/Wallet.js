import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h1 className="border-b-4 text-4xl text-center p-3 pb-4">Trybewallet</h1>
        <Header />
        <ExpensesForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
