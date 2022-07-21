import type { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import type { Coin, OfflineDirectSigner, OfflineSigner } from "@cosmjs/proto-signing";
import type { Key } from "@keplr-wallet/types";
import create from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { persist, subscribeWithSelector } from "zustand/middleware";

import type { GrazChain } from "../chains";

export interface GrazStore {
  account: Key | null;
  activeChain: GrazChain | null;
  balances: Coin[] | null;
  client: CosmWasmClient | null;
  defaultChain: GrazChain | null;
  offlineSigner: (OfflineSigner & OfflineDirectSigner) | null;
  offlineSignerAmino: OfflineSigner | null;
  offlineSignerAuto: (OfflineSigner | OfflineDirectSigner) | null;
  recentChain: GrazChain | null;
  signingClient: SigningCosmWasmClient | null;
  status: "connected" | "connecting" | "reconnecting" | "disconnected";
  _notFoundFn: () => void;
  _reconnect: boolean;
  _supported: boolean;
}

export type GrazPersistedStore = Pick<GrazStore, "activeChain" | "recentChain" | "_reconnect">;

export const defaultValues: GrazStore = {
  account: null,
  activeChain: null,
  balances: null,
  client: null,
  defaultChain: null,
  offlineSigner: null,
  offlineSignerAmino: null,
  offlineSignerAuto: null,
  recentChain: null,
  signingClient: null,
  status: "disconnected",
  _notFoundFn: () => null,
  _reconnect: false,
  _supported: false,
};

const persistOptions: PersistOptions<GrazStore, GrazPersistedStore> = {
  name: "graz",
  partialize: (x) => ({
    activeChain: x.activeChain,
    recentChain: x.recentChain,
    _reconnect: x._reconnect,
  }),
  version: 1,
};

export const useGrazStore = create(subscribeWithSelector(persist(() => defaultValues, persistOptions)));
