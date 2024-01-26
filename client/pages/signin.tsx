import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const { push } = useRouter();

    const handleAuthStudent = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const { message } = await requestChallengeAsync({ address: account, chainId: chain.id });

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('moralis-auth', { message, signature, redirect: false, callbackUrl: '/student' });
        /**
         * instead of using signIn(..., redirect: "/student")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };
    
    const handleAuthStaff = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const { message } = await requestChallengeAsync({ address: account, chainId: chain.id });

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('moralis-auth', { message, signature, redirect: false, callbackUrl: '/staff' });
        /**
         * instead of using signIn(..., redirect: "/staff")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };const handleAuthDistributor = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const { message } = await requestChallengeAsync({ address: account, chainId: chain.id });

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('moralis-auth', { message, signature, redirect: false, callbackUrl: '/ssDistributor' });
        /**
         * instead of using signIn(..., redirect: "/ssDistributor")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    return (
        <div>
            <h3>Web3 Authentication</h3>
            <button onClick={handleAuthStudent}>Student</button>
            <button onClick={handleAuthStaff}>Staff</button>
            <button onClick={handleAuthDistributor}>Distributor</button>           
        </div>
    );
}

export default SignIn;
