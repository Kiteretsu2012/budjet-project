import {
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FcOrganization, FcPodiumWithSpeaker } from 'react-icons/fc';
import { Link } from 'wouter';
import AddBudgetModal from '../components/organization-dashboard/AddBudgetModal';
import Empty from '../components/user-dashboard/Empty';
import api from '../utils/api';

const Budgets = ({ orgID }) => {
	const [budgets, setBudgets] = useState([]);
	const [isAddBudgetModalVisible, setisAddBudgetModalVisible] = useState(false);
	const toast = useToast();
	useEffect(() => {
		const fetchBudgets = async () => {
			try {
				const res = await api.get(`org/${orgID}/budgets`);
				setBudgets(await res.json());
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
		fetchBudgets();
	}, []);

	return (
		<>
			<HStack mb="2rem">
				<Heading marginRight="1rem">Budgets 💸</Heading>
				<AddBudgetModal
					orgID={orgID}
					isAddBudgetModalVisible={isAddBudgetModalVisible}
					setIsAddBudgetModalVisible={setisAddBudgetModalVisible}
				/>
				<Button
					colorScheme="purple"
					color="white"
					onClick={() => setisAddBudgetModalVisible(true)}
				>
					Create Budget
				</Button>
			</HStack>
			{budgets.length > 0 ? (
				<VStack>
					<Grid templateColumns="repeat(5, 1fr)" gap={6}>
						{budgets.map((budget, index) => {
							return (
								<GridItem key={index}>
									<Link to={`/budget/${budget._id}`}>
										<Flex
											w="25%"
											h="auto"
											maxH="200px"
											bg="white"
											color="black"
											p="1rem"
											minW="350px"
											style={{
												borderRadius: '12px',
												background: '#fff',
											}}
											_hover={{
												cursor: 'pointer',
											}}
											direction="column"
										>
											<Heading
												size="md"
												w="100%"
												h="auto"
												fontSize="1.3rem"
												mb="1rem"
											>
												{budget.title}
											</Heading>
											<Divider orientation="horizontal" w="100%" />
											<Flex w="100%" mt="1rem">
												{budget.description}
											</Flex>
										</Flex>
									</Link>
								</GridItem>
							);
						})}
					</Grid>
				</VStack>
			) : (
				<Empty emptyType="budget" />
			)}
		</>
	);
};

export default Budgets;
