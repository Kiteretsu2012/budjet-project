import {
	Button,
	FormControl,
	FormLabel,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from '@chakra-ui/react';
import { TiBusinessCard } from 'react-icons/ti';
import { useFormik } from 'formik';
import api from '../../utils/api';
import { useState } from 'react';
import { useLocation } from 'wouter';

function CreateOrgModal({ createOrgModalVisible, setCreateOrgModalVisible }) {
	// const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();
	const [, setLocation] = useLocation();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
		},
		onSubmit: async (values) => {
			try {
				setIsSubmitting(true);
				const res = await api.post('/org', values);
				setLocation(`/org/${res._id}`);
			} catch (err) {
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	const onClose = () => {
		setCreateOrgModalVisible(false);
	};
	return (
		<Modal isOpen={createOrgModalVisible} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create an Organisation</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={formik.handleSubmit}>
					<ModalBody>
						<FormControl mb="1rem">
							<FormLabel>Organisation Name</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									onChange={formik.handleChange}
									name="name"
									placeholder="Enter name of the organisation"
								/>
							</InputGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Organisation Description</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									onChange={formik.handleChange}
									name="description"
									placeholder="Enter description of the organisation"
								/>
							</InputGroup>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} type="submit" isLoading={isSubmitting}>
							Create
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default CreateOrgModal;
