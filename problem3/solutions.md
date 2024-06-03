
- The filtering and sorting logic inside useMemo is inefficient.
  => Optimize Filtering and Sorting Logic:
     Filter out zero or negative balances and then sort directly.
     Combine mapping for formatting within the same useMemo.
     Correct Dependency Array in useMemo:

- Too many if in the sorting logic, useMemo should only contain memoized computation 
  if (balance.amount <= 0) {
            return true;
          } extra 
  => Delete unused if 

- Prices is not called inside useMemo =>> extra re computation when prices change
  => Delete prices from dependencies array 

- balance.blockchain property DOES NOT exist on WalletBalance interface 
  => redefine the interface 

- sortedBalances missed the case where leftPriority === rightPriority
  => return 0 if "<" | ">" if does not meet

- Type Blockchain is Any 
  => Define the blockchain prop type, can use enum as it can be used in multiple places

- Interface FormattedWalletBalance can be extends from WalletBalance
  => interface FormattedWalletBalance extends WalletBalance {}



