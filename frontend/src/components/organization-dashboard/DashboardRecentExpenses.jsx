import { Button, Heading, HStack } from '@chakra-ui/react';

function DashboardRecentExpenses() {
	return (
		<div>
			<HStack justify="space-between">
				<Heading as="h2" size="lg">
					Recent expenses
				</Heading>
				<HStack>
					<Button bgColor={'#6EEB83'} color="white">
						{' '}
						Sort
					</Button>
					<Button bgColor={'#6EEB83'} color="white">
						Filter
					</Button>
				</HStack>
			</HStack>
		</div>
	);
}

export default DashboardRecentExpenses;
