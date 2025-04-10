import Container from "../../components/Layout.tsx/Container";
import wallet from "../../assets/icons/wallet.svg";
import bank from "../../assets/icons/bank.svg";
import copy from "../../assets/icons/copy.svg";
import time from "../../assets/icons/time.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { transactions } from "../../data/transactions";
import { TransactionType } from "../../types/data";
import { Paginator } from "primereact/paginator";
import React from "react";
import Modal from "../../components/ui/Modal";


const Wallet = () => {
  const [rows, setRows] = React.useState(10);
  const [first, setFirst] = React.useState(0);
  const [totalRecords, setTotalRecords] = React.useState(transactions.length);
  const [showModal, setshowModal] = React.useState(false);

  const onPageChange = (event: any) => {
    setRows(event.rows);
    setFirst(event.first);
  };

  const paginatedTransactions = transactions.slice(first, first + rows);

  return (
    <Container>
      <div className="w-full h-auto py-10 flex flex-col lg:flex-row gap-6">
        <Modal visible={showModal} onHide={() => setshowModal(false)} />

        <section className="w-full lg:w-1/3 border-r lg:border-r-[0.5px] pr-0 lg:pr-6 border-r-[#C8CBD9]">
          <div className="w-full flex flex-col bg-[#F9F9F7] p-4 md:p-6 rounded-xs">
            <div className="flex justify-between items-center pb-4 border-b border-b-[#C8CBD9]">
              <h2 className="text-xs font-medium text-[#595957]">Actual Balance</h2>
              <img src={wallet} alt="wallet" className="w-6" />
            </div>
            <div className="flex justify-between items-center py-6 border-b border-b-[#C8CBD9]">
              <h2 className="font-semibold text-[#0D0D0C] text-xl">₦200,000.00</h2>
            </div>
            <div className="flex gap-4 items-center py-5 border-b border-b-[#C8CBD9]">
              <img src={bank} alt="bank" className="w-4" />
              <h2 className="font-medium text-xs text-[#0D0D0C]">Wema Bank 010 210 2020</h2>
              <img src={copy} alt="copy" className="w-4" />
            </div>
            <div className="flex justify-between items-center py-5 border-b border-b-[#C8CBD9]">
              <h2 className="font-medium text-xs text-[#0D0D0C]">Pending amount</h2>
              <img src={time} alt="clock" className="w-6" />
            </div>
            <div className="flex justify-between items-center py-6 pb-10">
              <h2 className="font-semibold text-[#0D0D0C] text-xl">₦0.00</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button onClick={() => setshowModal(true)} className="bg-[#FFDE02] border border-[#FFDE02] py-2 text-xs font-medium text-[#0D0D0C] rounded-md">
              Add Funds
            </button>
            <button className="border border-[#D9D8D5] py-2 text-xs font-medium text-[#0D0D0C] rounded-md">
              Withdrawal
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            <button className="border border-[#D9D8D5] py-2 text-xs font-medium text-[#0D0D0C] rounded-md">
              PND Amount
            </button>
            <button className="border border-[#D9D8D5] py-2 text-xs font-medium text-[#0D0D0C] rounded-md">
              Place Lien
            </button>
            <button className="border border-[#D9D8D5] py-2 text-xs font-medium text-[#0D0D0C] rounded-md">
              Freeze Wallet
            </button>
          </div>
        </section>

        <section className="w-full lg:w-2/3 flex flex-col gap-4">
          <h2 className="text-[#1F384C] font-semibold text-lg">Transaction History</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button className="border border-[#D9D8D5] px-4 py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                3 years
              </button>
              <button className="border border-[#D9D8D5] px-4 py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                Approved
              </button>
              <button className="border border-[#D9D8D5] px-4 py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                Pending
              </button>
              <button className="border border-[#D9D8D5] px-4 py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                History
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-xs text-[#8C8C89] font-medium">Filter by</p>
              <select className="rounded-md text-xs py-1 px-4 border border-[#C8CBD9]">
                <option value="">Spot</option>
              </select>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-[#C8CBD9]">
                <TableRow>
                  <TableHead className="text-xs font-medium text-nowrap">Transaction ID</TableHead>
                  <TableHead className="text-xs font-medium text-nowrap">Transaction Type</TableHead>
                  <TableHead className="text-xs font-medium text-nowrap">Amount (₦)</TableHead>
                  <TableHead className="text-xs font-medium text-nowrap">Status</TableHead>
                  <TableHead className="text-xs font-medium text-nowrap">Date</TableHead>
                  <TableHead className="text-xs font-medium text-nowrap">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((t: TransactionType, index: number) => (
                    <TableRow key={index} className="border-b border-[#C8CBD9]">
                      <TableCell className="text-[11px] whitespace-nowrap">{t.transactionId}</TableCell>
                      <TableCell className="text-[11px] whitespace-nowrap">{t.transactionType}</TableCell>
                      <TableCell className="text-[11px] whitespace-nowrap">{t.amount}</TableCell>
                      <TableCell className="text-[11px] whitespace-nowrap flex gap-1 items-center">
                        <div className={`rounded-full w-2 h-2 ${t.status === "Approved" ? "bg-[#429777]" : "bg-[#FFB020]"}`} />
                        {t.status}
                      </TableCell>
                      <TableCell className="text-[11px] whitespace-nowrap">{t.date}</TableCell>
                      <TableCell>
                        <button className="border border-[#D9D8D5] px-4 py-1 text-xs font-medium text-[#0D0D0C] rounded-md">
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-sm">No available reports</td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-10 w-full">
            <Paginator
              totalRecords={totalRecords}
              rows={rows}
              first={first}
              onPageChange={onPageChange}
              rowsPerPageOptions={[5, 10, 20, 50]}
              className="gap-2 flex items-center"
            />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Wallet;
