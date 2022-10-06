import type { GrazChain } from "../chains";
import type { GrazStore } from "../store";
import { useGrazStore } from "../store";
import type { WalletType } from "../types/wallet";

export interface ConfigureGrazArgs {
  defaultChain?: GrazChain;
  defaultSigningClient?: GrazStore["defaultSigningClient"];
  defaultWallet?: WalletType;
  onNotFound?: () => void;
}

export const configureGraz = (args: ConfigureGrazArgs = {}): ConfigureGrazArgs => {
  useGrazStore.setState((prev) => ({
    defaultChain: args.defaultChain || prev.defaultChain,
    defaultSigningClient: args.defaultSigningClient || prev.defaultSigningClient,
    walletType: args.defaultWallet || prev.walletType,
    _notFoundFn: args.onNotFound || prev._notFoundFn,
  }));
  return args;
};
