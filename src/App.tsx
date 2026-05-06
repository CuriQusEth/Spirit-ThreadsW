/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Web3Provider } from './web3/Web3Provider';
import { GameEngine } from './components/game/GameEngine';

export default function App() {
  return (
    <Web3Provider>
      <GameEngine />
    </Web3Provider>
  );
}
