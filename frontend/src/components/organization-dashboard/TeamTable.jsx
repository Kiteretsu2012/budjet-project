import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import '../../components/organization-dashboard/CreateTeamModal';
import { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import api from '../../utils/api';
import CreateTeamModal from '../../components/organization-dashboard/CreateTeamModal';
import { getCurrentOrgID } from '../../utils/getOrgIdFromURL';

const TeamTable = () => {
	const [teamsData, setTeamsData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const orgID = getCurrentOrgID();
	useEffect(() => {
		const dataFetcher = async () => {
			const res = await api.get(`org/${orgID}/teams`).json();
			setTeamsData(res);
		};
		dataFetcher();
	}, []);
	return (
		<VStack>
			<CreateTeamModal
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
			/>
			<HStack justifyContent="end" w="100%">
				<Button
					colorScheme="red"
					onClick={() => {
						setIsOpen((prevState) => !prevState);
					}}
				>
					Add Team
				</Button>
			</HStack>
			<Flex w="100%" h="100vh" bg="#F1F1F1" gap="2rem">
				{teamsData?.map(({ name, organization }) => (
					<TeamCard teamName={name} organization={organization.name} key={name} />
				))}
			</Flex>
		</VStack>
	);
};

export default TeamTable;
