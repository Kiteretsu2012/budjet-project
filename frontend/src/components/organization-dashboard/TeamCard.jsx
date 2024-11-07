import { Button, Flex, Text, Divider, Heading, Icon, GridItem } from '@chakra-ui/react';
import { FcOrganization, FcPodiumWithSpeaker } from 'react-icons/fc';

const TeamCard = ({ teamName, organization, members }) => {
	return (
		<Flex
			w="25%"
			h="auto"
			maxH="200px"
			bg="blackAlpha.100"
			color="black"
			p="1rem"
			minW="350px"
			mb="1rem"
			style={{
				borderRadius: '12px',
				background: '#fff',
				// boxShadow: '20px 20px 60px #cdcdcd, -20px -20px 60px #ffffff',
			}}
			direction="column"
		>
			<Heading size="md" w="100%" h="auto" fontSize="1.3rem">
				{teamName}
			</Heading>
			<Divider orientation="horizontal" w="100%" />
			<Flex gap="40px" mt="10px">
				<Flex direction="column">
					<Text color="gray.400" mt="5%" fontSize="1rem">
						Organization:
					</Text>
					<Text textAlign="center">{organization}</Text>
				</Flex>
			</Flex>
			<Flex w="100%" justifyContent="center" mt="20px">
				<Button variant="outline" colorScheme="blue">
					View Members
				</Button>
			</Flex>
		</Flex>
	);
};

export default TeamCard;
