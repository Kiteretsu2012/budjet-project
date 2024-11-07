import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation } from 'wouter';
import api from '../../utils/api';
import { TiBusinessCard } from 'react-icons/ti';
import { FaKey } from 'react-icons/fa';
function JoinOrg() {
	// const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();
	const [location, setLocation] = useLocation();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const formik = useFormik({
		initialValues: {
			joiningCode: '',
		},
		onSubmit: async (values) => {
			try {
				setIsSubmitting(true);
				const res = await api.put(`user/join/org/${values.joiningCode}`, values);
				setIsSubmitting(false);
				if (res?.token) {
					localStorage.setItem('AUTH_TOKEN', res.token);
				}
				setLocation(`/org/${res._id}`);
			} catch (err) {
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<HStack>
				<FormControl>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<Icon as={TiBusinessCard} w={7} h={7} />
						</InputLeftElement>
						<Input
							backgroundColor={'gray.100'}
							name="joiningCode"
							placeholder="Enter the Joining Code"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.joiningCode}
						/>
					</InputGroup>
				</FormControl>
				<Button leftIcon={<FaKey />} colorScheme="purple" variant="solid" type="submit">
					{' '}
					Join
				</Button>
			</HStack>
		</form>
	);
}

export default JoinOrg;
