import {
	Avatar,
	Box,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown } from 'react-icons/fi';

const Header = () => {
	const userDetails = JSON.parse(localStorage.getItem('userDetails'));

	return (
		<Flex
			pl="2rem"
			pr={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'space-between' }}
		>
			<Text
				display={{ base: 'flex', md: 'flex' }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"
			>
				BudJet 🚀
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={`https://source.boringavatars.com/marble/120/${
										userDetails?.name || 'Justina Clark'
									}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">
										{userDetails?.name || 'Justina Clark'}
									</Text>
									{/* <Text fontSize="xs" color="gray.600">
										Admin
									</Text> */}
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}
						>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem>
							<MenuDivider />
							<MenuItem>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default Header;
