enum BC {
  OSM = "Osmosis",
  ETH = "Ethereum",
  ARB = "Arbitrum",
  ZIL = "Zilliqa",
  NEO = "NEO",
}

type Blockchain = BC.OSM | BC.ETH | BC.ARB | BC.ZIL | BC.NEO;
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case BC.OSM:
        return 100;
      case BC.ETH:
        return 50;
      case BC.ARB:
        return 30;
      case BC.ZIL:
        return 20;
      case BC.NEO:
        return 20;
      default:
        return -99;
    }
  };
  //-------------------------------------------------------
  const sortedAndFormattedBalances = useMemo(() => {
    const balancePriorityThreshold = -99;

    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > balancePriorityThreshold &&
        balance.amount <= 0;
    });
    const sortedBalances = filteredBalances.sort(
      (lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) return -1;
        if (leftPriority < rightPriority) return 1;
        return 0;
      }
    );
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }))

    return formattedBalances;
  }, [balances]);
  //-------------------------------------------------------

  const rows = sortedAndFormattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
