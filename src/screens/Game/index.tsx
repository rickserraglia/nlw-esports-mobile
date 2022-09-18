import { GameRouteParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
	const route = useRoute();
	const game = route.params as GameRouteParams;
	const [discordDuoSelected, setDiscordDuoSelected] = useState('');

	const [duos, setDuos] = useState<DuoCardProps[]>([]);

	const handleDiscordUser = async (adsId: string) => {
		fetch(`http://localhost:3333/ads/${adsId}/discord`)
			.then((response) => response.json())
			.then((data) => setDiscordDuoSelected(data.discord));
	};

	useEffect(() => {
		fetch(`http://localhost:3333/games/${game.id}/ads`)
			.then((response) => response.json())
			.then((data) => setDuos(data));
	}, []);

	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							name="chevron-thin-left"
							color={THEME.COLORS.CAPTION_300}
							size={20}
						/>
					</TouchableOpacity>

					<Image source={logoImg} style={styles.logo} />

					<View style={styles.right} />
				</View>

				<Image
					source={{ uri: game.bannerUrl }}
					style={styles.cover}
					resizeMode="cover"
				/>

				<Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

				<FlatList
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<DuoCard data={item} onConnect={() => handleDiscordUser(item.id)} />
					)}
					horizontal
					style={styles.containerList}
					contentContainerStyle={[
						duos.length > 0 ? styles.contentList : styles.emptyListContent
					]}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => (
						<Text style={styles.emptyListText}>
							Não há anúncios publicados ainda.
						</Text>
					)}
				/>

				<DuoMatch
					visible={discordDuoSelected.length > 0}
					onClose={() => setDiscordDuoSelected('')}
					discord={discordDuoSelected}
				/>
			</SafeAreaView>
		</Background>
	);
}
