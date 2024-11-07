import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import empty_illustration from '../../assets/empty_illustration.png';

function Empty({ emptyType = 'organisation' }) {
	return (
		<Box padding="2rem" marginX="2rem" marginTop="2rem" borderRadius="1rem">
			<VStack justify={'center'}>
				<Box boxSize="sm" borderRadius={'1rem'}>
					<Image src={empty_illustration} alt="Dan Abramov" />
				</Box>
				<Heading>Seems quiet in here.</Heading>
				<Text opacity="50%" fontSize="1.1rem">
					{' '}
					{emptyType === 'organisation'
						? 'You have not Joined nor Created any Organisations so far.'
						: 'You have not created any budgets so far'}
				</Text>
			</VStack>
		</Box>
	);
}

export default Empty;
