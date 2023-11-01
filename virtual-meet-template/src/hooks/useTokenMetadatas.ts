import { useCallback, useEffect, useState } from 'react';
import Moralis from 'moralis';
import { TokenData } from '@/types/TokenData';
import { apiKey, token_address_list } from '@/util/addresses';
import { current_chain } from '@/util/chain';

export function useTokenMetadata() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenData[]>([]);

  const fetchTokenMetadata = useCallback(async () => {
    try {
      if (Moralis.Core.isStarted) {
        await Moralis.start({ apiKey });
      }

      const token_metadatas = await Moralis.EvmApi.token.getTokenMetadata({
        addresses: token_address_list,
        chain: current_chain,
      });
      setTokens(token_metadatas.toJSON());
    } catch (error) {
      setMessage('Error fetching token metadata');
      console.log(`Error fetching token metadata: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTokenMetadata();
  }, [fetchTokenMetadata]);

  return {
    message,
    loading,
    tokens,
  };
}
