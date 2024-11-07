import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Text,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'wouter';
import levelsMap from '../../constants/levelsMap';
import CreateOrgModal from '../components/user-dashboard/CreateOrgModal';
import Empty from '../components/user-dashboard/Empty';

import Header from '../components/user-dashboard/Header';
import JoinOrg from '../components/user-dashboard/JoinOrg';
import api from '../utils/api';

function UserDashboard() {
	const [organisations, setOrganisations] = useState([]);
	const toast = useToast();
	// console.log(userDetails);
	// const userDetails = {
	// 	organisations: [
	// 		{ name: 'E-Cell', level: 'ADMIN' },
	// 		{ name: 'E-Cell', level: 'ADMIN' },
	// 		{ name: 'E-Cell', level: 'ADMIN' },
	// 	],
	// };

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const res = await api.get(`user/orgs`);
				const body = await res.json();
				setOrganisations(body);
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
		fetchTeams();
	}, []);

	const [createOrgModalVisible, setCreateOrgModalVisible] = useState(false);
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<CreateOrgModal
				createOrgModalVisible={createOrgModalVisible}
				setCreateOrgModalVisible={setCreateOrgModalVisible}
			/>
			<Header />
			<HStack
				padding="2rem"
				marginX="2rem"
				marginTop="2rem"
				borderRadius="1rem"
				bgColor="#EDE3E9"
				// h="100vh"
				justify="space-around"
			>
				{' '}
				<VStack>
					<Text fontSize={'2.2rem'} mb="1rem">
						Get started with <strong>BudJet</strong> to propel your budget management.
					</Text>
					<Text fontSize={'2rem'} fontWeight={'medium'}>
						Create an Organisation
					</Text>
					<Button
						leftIcon={<FaPlus />}
						colorScheme="purple"
						variant="solid"
						onClick={() => setCreateOrgModalVisible(true)}
						disabled={createOrgModalVisible}
					>
						{' '}
						Create Organisation
					</Button>
					<Text fontSize={'1.5rem'}>Or</Text>
					<Text fontSize={'2rem'} fontWeight={'medium'}>
						Join an Organisation
					</Text>
					<JoinOrg />
				</VStack>
				<Box height="40vh">
					<Divider orientation="vertical" borderWidth="0.2rem" borderColor="white" />
				</Box>
				{organisations?.length > 0 ? (
					<VStack>
						{organisations.map((organisation, index) => {
							return (
								<HStack
									key={index}
									backgroundColor="black"
									p="2rem"
									borderRadius="1rem"
									justify="space-between"
								>
									<Heading
										fontSize="2xl"
										fontWeight="bold"
										color="white"
										_dark={{
											color: 'white',
										}}
									>
										{organisation.name}
									</Heading>
									<Button
										as={Link}
										to={`/org/${organisation._id}`}
										px={2}
										py={1}
										bg="white"
										fontSize="xs"
										color="gray.900"
										fontWeight="bold"
										rounded="lg"
										textTransform="uppercase"
										_hover={{
											bg: 'gray.200',
										}}
										_focus={{
											bg: 'gray.400',
										}}
									>
										Go to Organisation
									</Button>
								</HStack>
							);
						})}
					</VStack>
				) : (
					<Empty setCreateOrgModalVisible={setCreateOrgModalVisible} />
				)}
			</HStack>
		</Box>
	);
}

export default UserDashboard;
