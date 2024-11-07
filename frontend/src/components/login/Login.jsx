import { Text, useToast, Heading, VStack, Box } from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import api from '../../utils/api';
import { useLocation } from 'wouter';

const Login = () => {
	const toast = useToast();
	const [, setLocation] = useLocation();

	const googleLoginHandler = async (v) => {
		try {
			const res = await api.post('user/auth', {
				credential: v.tokenId,
			});
			if (res?.token) {
				localStorage.setItem('AUTH_TOKEN', res.token);
				localStorage.setItem(
					'userDetails',
					JSON.stringify({ name: res.name, email: res.email })
				);
			}
			setLocation(`/user/dashboard`);
		} catch (err) {
			toast({
				title: 'Error',
				description: err.message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<VStack
			as="form"
			w="100%"
			h="100vh"
			padding="10%"
			style={{
				background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',
			}}
		>
			<Heading>Sign up</Heading>
			<Text>
				See what <b>budjet</b> is capable of
			</Text>
			<GoogleLogin
				clientId="795386949338-kfr53chb6l5sdmtinqosukakjmd0gemb.apps.googleusercontent.com"
				render={(renderProps) => (
					<GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
						Sign in with Google
					</GoogleButton>
				)}
				onSuccess={googleLoginHandler}
				onFailure={console.debug}
				cookiePolicy={'single_host_origin'}
			/>
		</VStack>
	);
};

export default Login;
