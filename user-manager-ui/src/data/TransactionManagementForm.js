export const TRANSACTION_TYPE_VALUES = ["Withdraw", "Deposit"];
export const TRANSACTION_MANAGEMENT_FORM = [
  {
    type: "dropdown",
    fieldName: "Transaction Type",
    name: "transactionType",
    dropdownValues: TRANSACTION_TYPE_VALUES,
  },
  {
    type: "number",
    fieldName: "Enter the amount",
    name: "loanAmount",
  },
];