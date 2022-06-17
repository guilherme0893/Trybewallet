import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import Table from '../components/Table';
import MainHeader from '../components/MainHeader';

class Wallet extends React.Component {
  render() {
    return (
      <main
        className="h-100 flex-col flex items-center justify-center pb-80"
        style={ {
          backgroundColor: '#9921e8',
          backgroundImage: 'linear-gradient(315deg, #cc99cc, #999999 75%)',
        } }
      >
        <MainHeader />
        <Header />
        <ExpensesForm />
        <Table />
      </main>
    );
  }
}

export default Wallet;
