import { useTonConnectUI } from '@tonconnect/ui-react'
import { Sender, SenderArguments } from 'ton-core'

function useTonConnect(callback?: () => void): {
  sender: Sender
  connected: boolean
} {
  const [tonConnectUI] = useTonConnectUI()

  return {
    sender: {
      send: async (args: SenderArguments) => {
        await tonConnectUI.sendTransaction(
          {
            messages: [
              {
                address: args.to.toString(),
                amount: args.value.toString(),
                payload: args.body?.toBoc().toString('base64'),
              },
            ],
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
          },
          {
            notifications: ['error'],
          },
        )

        callback && callback()
      },
    },
    connected: tonConnectUI?.connected,
  }
}
export default useTonConnect
