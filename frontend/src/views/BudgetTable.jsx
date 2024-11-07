import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	useToast,
	Button,
	Flex,
	Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import AddExpenseModal from '../components/organization-dashboard/AddExpenseModal';
import EditExpenseModal from '../components/organization-dashboard/EditExpenseModal';
import { BiEditAlt } from 'react-icons/bi';

const BudgetTable = () => {
	const toast = useToast();
	const [expenses, setExpenses] = useState([]);
	const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] = useState(false);
	const [isEditExpenseModalVisible, setIsEditExpenseModalVisible] = useState(false);
	const [editInitData, setEditInitData] = useState({});
	const [editId, setEditId] = useState('');
	useEffect(() => {
		const dataFetcher = async () => {
			const orgID = window.location.pathname.split('/')[2];
			const expenseID = window.location.pathname.split('/')[4];
			try {
				const res = await api.get(`org/${orgID}/budget/${expenseID}`).json();
				setExpenses(res.expenses);
			} catch (err) {
				const message = JSON.parse(await err.response.text()).message;
				toast({
					title: 'Error',
					description: message || 'Server Error',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		};
		dataFetcher();
	}, []);
	return (
		<>
			<Flex justify="end">
				<AddExpenseModal
					orgID={window.location.pathname.split('/')[2]}
					isAddExpenseModalVisible={isAddExpenseModalVisible}
					setIsAddExpenseModalVisible={setIsAddExpenseModalVisible}
					setExpenses={setExpenses}
				/>
				{Object.keys(editInitData).length && (
					<EditExpenseModal
						orgID={window.location.pathname.split('/')[2]}
						isEditExpenseModalVisible={isEditExpenseModalVisible}
						setIsEditExpenseModalVisible={setIsEditExpenseModalVisible}
						initialValues={editInitData}
						setExpenses={setExpenses}
						editId={editId}
					/>
				)}
				<Button
					colorScheme="whatsapp"
					onClick={() => {
						setIsAddExpenseModalVisible(true);
					}}
					mb="20px"
				>
					New Expense
				</Button>
			</Flex>
			<TableContainer
				bg="white"
				style={{
					borderRadius: '12px',
					boxShadow: '5px 5px 15px #cdcdcd, -5px -5px 15px #ffffff',
				}}
			>
				<Table variant="simple">
					<TableCaption>List Of All Impending Budgets</TableCaption>
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Description</Th>
							<Th>Plan-A</Th>
							<Th>Plan-B</Th>
							<Th>Plan-C</Th>
							<Th>Edit</Th>
							<Th>Invoices</Th>
						</Tr>
					</Thead>
					<Tbody>
						{expenses.map(
							({ title, description, _id, amounts: { A, B, C }, invoice }) => (
								<Tr key={title}>
									<Td>{title}</Td>
									<Td>{description}</Td>
									<Td>{A}</Td>
									<Td>{B}</Td>
									<Td>{C}</Td>
									<Td>
										<Button
											variant="outline"
											onClick={() => {
												setEditInitData({
													title,
													description,
													A,
													B,
													C,
												});
												setEditId(_id);
												setIsEditExpenseModalVisible(true);
											}}
										>
											<Icon as={BiEditAlt} />
										</Button>
									</Td>
									<Td>{invoice}</Td>
								</Tr>
							)
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default BudgetTable;
