
/**
 * Wallet utility functions for Otakuverse
 * Handles Phantom and Backpack wallet connections
 */

// Types for wallet interactions
export interface WalletInfo {
  name: string;
  publicKey: string;
  isConnected: boolean;
}



// Check if Backpack wallet is available
export const isBackpackAvailable = (): boolean => {
  return window && 'backpack' in window;
};



// Connect to Backpack wallet
export const connectBackpack = async (): Promise<WalletInfo | null> => {
  try {
    if (!isBackpackAvailable()) {
      window.open('https://www.backpack.app/', '_blank');
      return null;
    }

    const provider = window.backpack;
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();

    return {
      name: 'Backpack',
      publicKey: publicKey,
      isConnected: true
    };
  } catch (error) {
    console.error('Error connecting to Backpack wallet:', error);
    return null;
  }
};

// Disconnect from wallet
export const disconnectWallet = async (walletName: string): Promise<boolean> => {
  try {
    if (walletName === 'Phantom' && isPhantomAvailable()) {
      await window.solana.disconnect();
      return true;
    } 
    
    if (walletName === 'Backpack' && isBackpackAvailable()) {
      await window.backpack.disconnect();
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error disconnecting from ${walletName} wallet:`, error);
    return false;
  }
};
