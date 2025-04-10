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
  const [rows, setRows] = React.useState(10); // rows per page
  const [first, setFirst] = React.useState(0); // first index of current page
  const [totalRecords, setTotalRecords] = React.useState(transactions.length);
  const [showModal, setshowModal] = React.useState(!false);

  const onPageChange = (event: any) => {
    setRows(event.rows); // set rows per page
    setFirst(event.first); // set first record index for the new page
  };

  const paginatedTransactions = transactions.slice(first, first + rows);
  return (
    <Container>
      <div className="w-full h-auto py-10 flex items-start">
        <Modal visible={showModal} onHide={() => setshowModal(false)} />
        <section className="w-[35%] border-r-[0.5px] pr-6 border-r-[#C8CBD9] h-full">
          <div className="w-full flex flex-col bg-[#F9F9F7] p-6 rounded-xs">
            <div className="flex justify-between items-center pb-4 border-b-[0.5px] border-b-[#C8CBD9]">
              <h2 className="text-xs font-medium text-[#595957]">
                Actual Balance
              </h2>
              <img src={wallet} alt="wallet" className="w-[25px]" />
            </div>
            <div className="flex justify-between items-center py-6 border-b-[0.5px] border-b-[#C8CBD9]">
              <h2 className="font-semibold text-[#0D0D0C]">₦200,000.00</h2>
            </div>
            <div className="flex gap-4 items-center py-5 border-b-[0.5px] border-b-[#C8CBD9]">
              <img src={bank} alt="bank" className="w-[18px]" />
              <h2 className="font-medium text-xs text-[#0D0D0C]">
                Wema Bank 010 210 2020
              </h2>
              <img src={copy} alt="copy" className="w-[18px]" />
            </div>
            <div className="flex justify-between items-center py-5 border-b-[0.5px] border-b-[#C8CBD9]">
              <h2 className="font-medium text-xs text-[#0D0D0C]">
                Pending amount
              </h2>
              <img src={time} alt="clock" className="w-[24px]" />
            </div>
            <div className="flex justify-between items-center py-6 pb-10">
              <h2 className="font-semibold text-[#0D0D0C]">₦0.00</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => setshowModal(true)}
              className="bg-[#FFDE02] border-[0.5px] border-[#FFDE02] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md"
            >
              Add Funds
            </button>
            <button className="bg-transparent border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
              Withdrawal
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button className="bg-transparent border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
              PND Amount
            </button>
            <button className="bg-transparent border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
              Place Lien
            </button>
            <button className="bg-transparent border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
              Freeze Wallet
            </button>
          </div>
        </section>
        <section className="w-[65%] flex flex-col gap-4 pl-6">
          <h2 className="text-[#1F384C] font-semibold">Transaction History</h2>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button className="bg-transparent px-5 border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                3 years
              </button>
              <button className="bg-transparent px-5 border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                Approved
              </button>
              <button className="bg-transparent px-5 border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                Pending
              </button>
              <button className="bg-transparent px-5 border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                History
              </button>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-xs text-[#8C8C89] font-medium">Filter by</p>
              <select
                name=""
                id=""
                className="rounded-md text-xs py-1 px-4 border-[0.5px] border-[#C8CBD9]"
              >
                <option value="">Spot</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <Table>
              <TableHeader className="border-b-[0.5px] border-b-[#C8CBD9]">
                <TableRow className="border-b-[0.5px] border-b-[#C8CBD9] border-t-[0.5px] border-t-[#C8CBD9]">
                  <TableHead className="text-xs text-[#0D0D0C] font-medium">
                    Transaction ID
                  </TableHead>
                  <TableHead className="text-xs text-[#0D0D0C] font-medium">
                    Transaction Type
                  </TableHead>
                  <TableHead className="text-xs text-[#0D0D0C] font-medium">
                    Amount (₦)
                  </TableHead>
                  <TableHead className="text-xs text-[#0D0D0C] font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-xs text-[#0D0D0C] font-medium">
                    Date
                  </TableHead>
                  <TableHead className="text-xs text-[#0D0D0C] font-medium">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions?.length > 0 ? (
                  paginatedTransactions.map(
                    (t: TransactionType, index: number) => (
                      <TableRow
                        className="border-b-[0.5px] border-b-[#C8CBD9]"
                        key={index}
                      >
                        <TableCell className="text-[#3B3A39] text-[11px]">
                          {t?.transactionId}
                        </TableCell>
                        <TableCell className="text-[#3B3A39] text-[11px]">
                          {t?.transactionType}
                        </TableCell>
                        <TableCell className="text-[#3B3A39] text-[11px]">
                          {t?.amount}
                        </TableCell>
                        <TableCell className="text-[#3B3A39] text-[11px] flex gap-1 items-center">
                          <div
                            className={`rounded-full w-2 h-2 ${
                              t?.status == "Approved"
                                ? "bg-[#429777]"
                                : "bg-[#FFB020]"
                            }`}
                          ></div>{" "}
                          {t?.status}
                        </TableCell>
                        <TableCell className="text-[#3B3A39] text-[11px]">
                          {t?.date}
                        </TableCell>
                        <TableCell>
                          <button className="bg-transparent px-5 border-[0.5px] border-[#D9D8D5] cursor-pointer py-1.5 text-xs font-medium text-[#0D0D0C] rounded-md">
                            View
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <h2 className="text-lg w-[250px] m-2">
                    No available reports
                  </h2>
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
