import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useAppContext } from '@/contexts/AppContext';

export function useAuth() {
  const { address, isConnected } = useAccount();

  const { setAddress, setIsConnected } = useAppContext();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      if (isConnected) {
        await handleDisconnect();
      }
      await connect();
      setAddress(address ?? '');
      setIsConnected(isConnected);
    } catch (e) {
      console.log(`Error connecting: ${e}`);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setAddress(address ?? '');
      setIsConnected(isConnected);
    } catch (e) {
      console.log(`Error connecting: ${e}`);
    }
  };

  return {
    address,
    isConnected,
    handleConnect,
    handleDisconnect,
  };
}
