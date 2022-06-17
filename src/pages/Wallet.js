import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1
            className="border-b-4 text-5xl text-center m-auto max-w-lg font-bold"
          >
            Trybewallet
          </h1>
        </header>
        <Header />
        <ExpensesForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
